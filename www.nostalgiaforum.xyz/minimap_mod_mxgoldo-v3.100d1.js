//MiniMap mod
//Copyright 2015 MxGoldo
var curVersion = 3.1,
	X,
	Z,
	YAW,
	DIMENSION,
	redraw = false,
	startMapControl = true,
	settings = {},
	settingsLoaded = false,
	map_state = false,
	entities = [],
	chests = [],
	minZoom,
	absZoom,
	bmpSrc,
	bmpSrcCopy,
	bmpBorder,
	pathBorder,
	canvasBmpSrc = new android.graphics.Canvas(),
	canvasBmpSrcCopy = new android.graphics.Canvas(),
	matrixMap = new android.graphics.Matrix(),
	matrixPointer = new android.graphics.Matrix(),
	bmpSrcLock = new java.util.concurrent.Semaphore (1, true),
	delayChunksArrLock = new java.util.concurrent.Semaphore (1, true),
	delayChunksArr = [],
	pool,
	poolTick,
	scheduledFutureUpdateMap,
	runnableUpdateMap,
	context = com.mojang.minecraftpe.MainActivity.currentMainActivity.get(),
	mapWindow,
	setWindow,
	density = context.getResources().getDisplayMetrics().density,
	displayHeight = (context.getResources().getDisplayMetrics().widthPixels < context.getResources().getDisplayMetrics().heightPixels) ? context.getResources().getDisplayMetrics().widthPixels : context.getResources().getDisplayMetrics().heightPixels;
(function () {
	var i, settingsString, d = Math.floor(new Date().getTime() / 1000);
	settingsString = load(android.os.Environment.getExternalStorageDirectory().getPath() + "/games/com.mojang/minecraftpe/mods/", "minimap.txt").split("\n");
	for (i = 0; i < settingsString.length; i += 1) {settings[settingsString[i].split(":")[0]] = parseFloat(settingsString[i].split(":")[1]); }
	if (settings.version !== curVersion) {
		settings = {radius: 4,
					map_type: 1,
					map_zoom: 80,
					map_alpha: 70,
					show_passive: 1,
					show_hostile: 1,
					show_player: 1,
					show_otherPlayer: 1,
					show_chest: 0,
					hide_underground_mob: 0,
					button_size: 40,
					window_rawSize: 35,
					window_size: displayHeight * 0.35,
					window_rawPosition: 0,
					window_gravity: 51,
					window_y: 0,
					style_border: 1,
					style_pointer: 3,
					style_shape: 0,
					show_info: 1,
					show_zoomBtn: 1,
					delay: 20,
					threadCount: 4,
					updateCheck: 1,
					updateCheckTime: 0,
					updateVersion: curVersion,
					version: curVersion}
	}
	new java.lang.Thread(function () {
		android.os.Process.setThreadPriority(android.os.Process.THREAD_PRIORITY_BACKGROUND);
		var newVersion;
		if (Math.floor(settings.updateCheckTime / 86400) < Math.floor(d / 86400) && settings.updateCheck) {
			newVersion = parseFloat(loadTxtFromUrl("https://raw.githubusercontent.com/MxGoldo/MCPE-mod-scripts/master/MiniMap_Mod_version"));
			if (!isNaN(newVersion)) {settings.updateCheckTime = d; }
			if (newVersion > curVersion) {settings.updateVersion = newVersion; }
			saveSettings();
		}
		if (settings.updateVersion > curVersion && settings.updateCheck) {
			context.runOnUiThread(function() {
				settingsUI(["MiniMap Mod", "Close",
						   ["keyValue", "text", "New version available !<br/>Your version: " + curVersion.toFixed(1) + "<br/>Latest version: " + settings.updateVersion.toFixed(1) +
						   "<br/><br/>Download from <a href=http://www.minecraftforum.net/forums/minecraft-pocket-edition/mcpe-mods-tools/2336349>minecraftforum.net</a>", ""],
						   ["checkBox", "updateCheck", "Check for updates"]]).show();
			});
		}
	}).start();
	bmpBorder = drawBorderBmp();
	pathBorder = createPath(false, true);
	bmpSrc = android.graphics.Bitmap.createBitmap(((settings.radius + 1) * 2 + 1) * 16, ((settings.radius + 1) * 2 + 1) * 16, android.graphics.Bitmap.Config.ARGB_8888);
	bmpSrcCopy = android.graphics.Bitmap.createBitmap(bmpSrc.getWidth(), bmpSrc.getHeight(), android.graphics.Bitmap.Config.ARGB_8888);
	canvasBmpSrc.setBitmap(bmpSrc);
	canvasBmpSrcCopy.setBitmap(bmpSrcCopy);
	minZoom = settings.window_size / (settings.radius * 2 * 16);
	absZoom = (100 / settings.map_zoom) * minZoom;
	poolTick = java.util.concurrent.Executors.newSingleThreadScheduledExecutor();
	runnableUpdateMap = new java.lang.Runnable(function () {
		try {
			android.os.Process.setThreadPriority(android.os.Process.THREAD_PRIORITY_BACKGROUND);
			var xNew = Player.getX(),
				zNew = Player.getZ(),
				yawNew = getYaw(),
				xChunkNew,
				zChunkNew,
				xChunkOld,
				zChunkOld,
				dimensionNew = Player.getDimension(),
				i,
				ix,
				radius = settings.radius * 16;
			if (xNew !== X || zNew !== Z || yawNew !== YAW || redraw || dimensionNew !== DIMENSION) {
				redraw = false;
				xChunkNew = Math.floor(xNew / 16) * 16;
				zChunkNew = Math.floor(zNew / 16) * 16;
				xChunkOld = Math.floor(X / 16) * 16;
				zChunkOld = Math.floor(Z / 16) * 16;
				if (xChunkNew !== xChunkOld || zChunkNew !== zChunkOld || dimensionNew !== DIMENSION) {
					if (Math.abs(xChunkNew - xChunkOld) <= radius * 2 && Math.abs(zChunkNew - zChunkOld) <= radius * 2 && dimensionNew === DIMENSION) {
						try {
							bmpSrcLock.acquire();
							bmpSrcCopy.eraseColor(0);
							canvasBmpSrcCopy.drawBitmap(bmpSrc, zChunkNew - zChunkOld, xChunkOld - xChunkNew, null);
							bmpSrc.eraseColor(0);
							canvasBmpSrc.drawBitmap(bmpSrcCopy, 0, 0, null);
						} finally {
							X = xNew;
							Z = zNew;
							bmpSrcLock.release();
						}
						if (xChunkNew > xChunkOld) {
							for (i = radius + 16 - (xChunkNew - xChunkOld); i <= radius; i += 16) {
								scheduleChunk(xChunkNew + i, zChunkNew, 0);
								for (ix = 16; ix <= radius; ix += 16) {
									scheduleChunk(xChunkNew + i, zChunkNew + ix, 0);
									scheduleChunk(xChunkNew + i, zChunkNew - ix, 0);
								}
							}
						} else if (xChunkOld > xChunkNew) {
							for (i = radius + 16 - (xChunkOld - xChunkNew); i <= radius; i += 16) {
								scheduleChunk(xChunkNew - i, zChunkNew, 0);
								for (ix = 16; ix <= radius; ix += 16) {
									scheduleChunk(xChunkNew - i, zChunkNew + ix, 0);
									scheduleChunk(xChunkNew - i, zChunkNew - ix, 0);
								}
							}
						}
						if (zChunkNew > zChunkOld) {
							for (i = radius + 16 - (zChunkNew - zChunkOld); i <= radius; i += 16) {
								scheduleChunk(xChunkNew, zChunkNew + i, 0);
								for (ix = 16; ix <= radius; ix += 16) {
									scheduleChunk(xChunkNew + ix, zChunkNew + i, 0);
									scheduleChunk(xChunkNew - ix, zChunkNew + i, 0);
								}
							}
						} else if (zChunkOld > zChunkNew) {
							for (i = radius + 16 - (zChunkOld - zChunkNew); i <= radius; i += 16) {
								scheduleChunk(xChunkNew, zChunkNew - i, 0);
								for (ix = 16; ix <= radius; ix += 16) {
									scheduleChunk(xChunkNew + ix, zChunkNew - i, 0);
									scheduleChunk(xChunkNew - ix, zChunkNew - i, 0);
								}
							}
						}
					} else {
						X = xNew;
						Z = zNew;
						chests = [];
						bmpSrc.eraseColor(0);
						scheduleChunk(xChunkNew, zChunkNew, 0);
						for (i = 16; i <= settings.radius * 16; i += 16) {
							for (ix = 0; ix < i; ix += 16) {
								scheduleChunk(xChunkNew + ix + 16, zChunkNew + i, 0);
								scheduleChunk(xChunkNew + ix, zChunkNew - i, 0);
								scheduleChunk(xChunkNew - ix, zChunkNew + i, 0);
								scheduleChunk(xChunkNew - ix - 16, zChunkNew - i, 0);
								scheduleChunk(xChunkNew + i, zChunkNew + ix, 0);
								scheduleChunk(xChunkNew + i, zChunkNew - ix - 16, 0);
								scheduleChunk(xChunkNew - i, zChunkNew + ix + 16, 0);
								scheduleChunk(xChunkNew - i, zChunkNew - ix, 0);
							}
						}
					}
				} else {
					X = xNew;
					Z = zNew;
				}
				YAW = yawNew;
				DIMENSION = dimensionNew;
				var zoom = absZoom,
					style_pointer = settings.style_pointer,
					x0 = xNew - (settings.window_size * 0.5 / zoom),
					z0 = zNew + (settings.window_size * 0.5 / zoom);
				matrixMap.setTranslate(settings.window_size * 0.5 - (bmpSrc.getWidth() * 0.5) - 8 + zNew - zChunkNew, settings.window_size * 0.5 - (bmpSrc.getHeight() * 0.5) + 8 - xNew + xChunkNew);
				matrixMap.postScale(zoom, zoom, settings.window_size * 0.5, settings.window_size * 0.5);
				if (settings.show_info) {mapWindow.setInfo(); }
				var canvas = mapView.lockCanvas();
				canvas.drawColor(0, android.graphics.PorterDuff.Mode.CLEAR);
				canvas.save(android.graphics.Canvas.CLIP_SAVE_FLAG);
				canvas.clipPath(pathBorder, android.graphics.Region.Op.REPLACE);
				canvas.drawBitmap(bmpSrc, matrixMap, bmpPaint);
				if (settings.show_chest) {
					i = chests.length;
					while(i--) {
						matrixPointer.setTranslate((z0 - chests[i][1]) * zoom, (chests[i][0] - x0) * zoom);
						matrixPointer.preConcat(pointer[3].matrix);
						canvas.drawBitmap(pointer[3].bmp, matrixPointer, null);
					}
				}
				if (settings.show_passive || settings.show_hostile || settings.show_otherPlayer) {
					redraw = true;
					i = entities.length;
					var id;
					while(i--) {
						if (!settings.hide_underground_mob || Entity.getY(entities[i]) > 60) {
							id = Entity.getEntityTypeId(entities[i]);
							if (style_pointer !== 3) {
								if (id < 32 && settings.show_passive) {
									matrixPointer.reset();
									if (pointer[style_pointer].rotate) {matrixPointer.postRotate(Entity.getYaw(entities[i]) - 90); }
									matrixPointer.postTranslate((z0 - Entity.getZ(entities[i])) * zoom, (Entity.getX(entities[i]) - x0) * zoom);
									matrixPointer.preConcat(pointer[style_pointer].matrix);
									canvas.drawBitmap(pointer[style_pointer].bmp, matrixPointer, pointerPaint.GREEN);
								} else if (id < 63 && id >= 32 && settings.show_hostile) {
									matrixPointer.reset();
									if (pointer[style_pointer].rotate) {matrixPointer.postRotate(Entity.getYaw(entities[i]) - 90); }
									matrixPointer.postTranslate((z0 - Entity.getZ(entities[i])) * zoom, (Entity.getX(entities[i]) - x0) * zoom);
									matrixPointer.preConcat(pointer[style_pointer].matrix);
									canvas.drawBitmap(pointer[style_pointer].bmp, matrixPointer, pointerPaint.RED);
								} else if (id === 63 && settings.show_otherPlayer) {
									matrixPointer.reset();
									if (pointer[style_pointer].rotate) {matrixPointer.postRotate(Entity.getYaw(entities[i]) - 90); }
									matrixPointer.postTranslate((z0 - Entity.getZ(entities[i])) * zoom, (Entity.getX(entities[i]) - x0) * zoom);
									matrixPointer.preConcat(pointer[style_pointer].matrix);
									canvas.drawBitmap(pointer[style_pointer].bmp, matrixPointer, null);
								}
							} else if ((id < 32 && settings.show_passive) || (id < 63 && id >= 32 && settings.show_hostile) || (id === 63 && settings.show_otherPlayer)) {
								matrixPointer.reset();
								matrixPointer.postRotate(Entity.getYaw(entities[i]) - 90);
								matrixPointer.postTranslate((z0 - Entity.getZ(entities[i])) * zoom, (Entity.getX(entities[i]) - x0) * zoom);
								matrixPointer.preConcat(iconMatrix);
								canvas.drawBitmap(heads[id] || heads[0], matrixPointer, null);
							}
						}
					}
				}
				if (settings.show_player && !settings.show_otherPlayer) {
					if (style_pointer !== 3) {
						matrixPointer.reset();
						if (pointer[style_pointer].rotate) {matrixPointer.postRotate(yawNew - 90); }
						matrixPointer.postTranslate(settings.window_size * 0.5, settings.window_size * 0.5);
						matrixPointer.preConcat(pointer[style_pointer].matrix);
						canvas.drawBitmap(pointer[style_pointer].bmp, matrixPointer, null);
					} else {
						matrixPointer.reset();
						matrixPointer.postRotate(yawNew - 90);
						matrixPointer.postTranslate(settings.window_size * 0.5, settings.window_size * 0.5);
						matrixPointer.preConcat(iconMatrix);
						canvas.drawBitmap(heads[63] || heads[0], matrixPointer, null);
					}
				}
				canvas.restore();
				if (bmpBorder !== null) {
					canvas.drawBitmap(bmpBorder, 0, 0, null);
				}
				mapView.unlockCanvasAndPost(canvas);
			}
		} catch(e) {
			// print("UpdateMap, " + e + " (" + e.fileName + " #" + e.lineNumber + ")");
		}
	});
}());
var bmpPaint = new android.graphics.Paint(),
	mapView = new android.view.TextureView(context),
	mapWindow = function () {
	var btnSet = new android.widget.Button(context),
		btnZoomIn,
		btnZoomOut,
		textInfo = new android.widget.TextView(context),
		mapLp = new android.widget.RelativeLayout.LayoutParams(settings.window_size , settings.window_size ),
		btnZoomInLp = new android.widget.RelativeLayout.LayoutParams(settings.button_size * density, settings.button_size * density),
		btnZoomOutLp = new android.widget.RelativeLayout.LayoutParams(settings.button_size * density, settings.button_size * density),
		textInfoLp = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT),
		layout = new android.widget.RelativeLayout(context),
		mapWin = new android.widget.PopupWindow(layout, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT),
		btnActions = {
			set : function () {
				if (!setWindow) {
					setWindow = settingsUI(
						["MiniMap Mod Options", "Ok",
						["sectionDivider", "Graphics"],
						 ["keyValue", "multipleChoice", "MiniMap type", "map_type", ["basic surface (fast)", "surface", "cave"]],
						 ["keyValue", "slider", "Minimap render distance", "radius", 1, checkRenderDistance() + 4, 1, " chunks"],
						 ["keyValue", "slider", "Zoom", "map_zoom", 10, 100, 1, "%"],
						 ["subScreen", "Icons and Indicators ", ["Icons and Indicators", "Ok",
							["sectionDivider", "Entity"],
							 ["keyValue", "multipleChoice", "pointer style", "style_pointer", ["crosshairs", "arrow", "minecraft", "head"]],
							 ["checkBox", "hide_underground_mob", "hide entities below sea level"],
							 ["checkBox", "show_player", "you"],
							 ["checkBox", "show_otherPlayer", "other players"],
							 ["checkBox", "show_passive", "passive mobs"],
							 ["checkBox", "show_hostile", "hostile mobs"],
							["sectionDivider", "Icon"],
							 ["checkBox", "show_chest", "chests"]]],
						["sectionDivider", "View"],
						 ["keyValue", "multipleChoice", "Position", "window_rawPosition", ["top left", "top left (offset)", "top right", "bottom left", "bottom right"], "window_gravity", [51, 51, 53, 83, 85], "window_y", [0, 40 * density, 40 * density, 0, 0]],
						 ["keyValue", "slider", "Size", "window_rawSize", 5, 100, 5, "%"],
						 ["keyValue", "slider", "Opacity", "map_alpha", 20, 100, 1, "%"],
						 ["keyValue", "slider", "Button size", "button_size", 20, 60, 1, "dp"],
						 ["checkBox", "show_info", "Coordinates visible"],
						 ["checkBox", "show_zoomBtn", "Zoom Buttons visible"],
						["sectionDivider", "Style"],
						 ["keyValue", "multipleChoice", "border style", "style_border", ["none", "simple", "colourful"]],
						 ["keyValue", "multipleChoice", "window shape", "style_shape", ["square", "circle"]],
						["sectionDivider", "Other"],
						 ["checkBox", "updateCheck", "Check for updates " + (settings.updateVersion > curVersion ? "(update available)" : "")],
						 ["subScreen", "Advanced ", ["Advanced", "Ok",
							["keyValue", "slider", "Minimap max frequency", "delay", 1, 40, 1, " fps"],
							["keyValue", "slider", "Threads count", "threadCount", 1, 12, 1, ""]]],
						 ["subScreen", "MiniMap Mod info ", ["MiniMap Mod info", "Ok",
							["keyValue", "text", "Version ", curVersion.toFixed(1)],
							["keyValue", "text", "Made by", "MxGoldo"],
							["keyValue", "text", "<a href=http://www.minecraftforum.net/forums/minecraft-pocket-edition/mcpe-mods-tools/2336349>minecraftforum.net thread</a>", ""]
						]]]).show();
				} else {
					setWindow.show();
				}
			}
		};
	bmpPaint.setXfermode(new android.graphics.PorterDuffXfermode(android.graphics.PorterDuff.Mode.SRC));
	mapView.setId(1);
	mapView.setBackgroundColor(settings.style_shape ? 0 : -12303292);
	mapView.setVisibility(android.view.View.GONE);
	mapView.setAlpha(settings.map_alpha / 100);
	mapLp.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
	mapView.setOnClickListener(function(v){
		changeMapState();
	});
	mapView.setOnLongClickListener(function(v) {
		btnActions.set();
		return true;
	});
	btnSet.setBackgroundResource(android.R.drawable.ic_menu_mylocation);
	btnSet.setVisibility(android.view.View.VISIBLE);
	btnSet.setLayoutParams(new android.widget.LinearLayout.LayoutParams(settings.button_size * density, settings.button_size * density));
	btnSet.setOnClickListener(function(v) {
		changeMapState();
	});
	btnSet.setOnLongClickListener(function(v) {
		btnActions.set();
		return true;
	});
	textInfo.setId(2);
	textInfo.setVisibility(android.view.View.GONE);
	textInfoLp.addRule(android.widget.RelativeLayout.BELOW, 1);
	textInfoLp.addRule(android.widget.RelativeLayout.ALIGN_LEFT, 1);
	textInfoLp.addRule(android.widget.RelativeLayout.ALIGN_RIGHT, 1);
	textInfo.setTextSize(15);
	textInfo.setPadding(3 * density, 0, 0, 0);
	textInfo.setBackgroundColor(android.graphics.Color.argb(204, 136, 136, 136));
	textInfo.setTextColor(android.graphics.Color.WHITE);
	btnZoomOut = minecraftButton("-", settings.button_size, settings.button_size);
	btnZoomOut.setId(3);
	btnZoomOut.setVisibility(android.view.View.GONE);
	btnZoomOutLp.addRule(android.widget.RelativeLayout.BELOW, 2);
	btnZoomOut.setOnClickListener(function(v) {
		if (settings.map_zoom * 1.2 >= 100) {
			android.widget.Toast.makeText(context, "minimum zoom reached", android.widget.Toast.LENGTH_SHORT).show();
			settings.map_zoom = 100;
		} else {
			settings.map_zoom = Math.round(settings.map_zoom * 1.2);
		}
		settingsChanged("map_zoom");
		saveSettings();
	});
	btnZoomIn = minecraftButton("+", settings.button_size, settings.button_size);
	btnZoomIn.setId(4);
	btnZoomIn.setVisibility(android.view.View.GONE);
	btnZoomInLp.addRule(android.widget.RelativeLayout.BELOW, 2);
	btnZoomInLp.addRule(android.widget.RelativeLayout.RIGHT_OF, 3);
	btnZoomIn.setOnClickListener(function(v) {
		if (settings.map_zoom * 0.8 <= 10) {
			android.widget.Toast.makeText(context, "maximum zoom reached", android.widget.Toast.LENGTH_SHORT).show();
			settings.map_zoom = 10;
		} else {
			settings.map_zoom = Math.round(settings.map_zoom * 0.8);
		}
		settingsChanged("map_zoom");
		saveSettings();
	});
	layout.addView(btnSet);
	layout.addView(mapView, mapLp);
	layout.addView(btnZoomIn, btnZoomInLp);
	layout.addView(btnZoomOut, btnZoomOutLp);
	layout.addView(textInfo, textInfoLp);
	mapWin.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
	return {
	setInfo: function () {
		context.runOnUiThread(function() {
			textInfo.setText("X:" + Math.floor(Player.getX()) + " Y:" + Math.floor(Player.getY() - 2) + " Z:" + Math.floor(Player.getZ()));
		});
	},
	resetVisibility: function () {
		context.runOnUiThread(function() {
			var visible = android.view.View.VISIBLE, gone = android.view.View.GONE;
			if (map_state) {
				btnSet.setVisibility(gone);
				mapView.setVisibility(visible);
				btnZoomIn.setVisibility(settings.show_zoomBtn ? visible : gone);
				btnZoomOut.setVisibility(settings.show_zoomBtn ? visible : gone);
				textInfo.setVisibility(settings.show_info ? visible : gone);
			} else {
				btnSet.setVisibility(visible);
				mapView.setVisibility(gone);
				btnZoomIn.setVisibility(gone);
				btnZoomOut.setVisibility(gone);
				textInfo.setVisibility(gone);
			}
		});
	},
	show: function () {
		context.runOnUiThread(function() {
			mapWin.showAtLocation(context.getWindow().getDecorView(), settings.window_gravity, 0, settings.window_y);
		});
	},
	hide: function () {
		context.runOnUiThread(function() {
			mapWin.dismiss();
		});
	}};
}();
function modTick() {
	if (startMapControl) {
		startMapControl = false;
		mapWindow.show();
		createPool();
	}
}
function leaveGame() {
	try {
		mapWindow.hide();
		if (map_state) {
			changeMapState();
		}
		pool.shutdownNow();
		startMapControl = true;
		X = undefined;
		entities = [];
		chests = [];
	} catch (e) {
		print("leaveGame, " + e + " (" + e.fileName + " #" + e.lineNumber + ")");
	}
}
function entityRemovedHook(entity) {
	if (Entity.getEntityTypeId(entity) <= 63 && Entity.getEntityTypeId(entity) >= 10 ) {
		var index = entities.indexOf(entity)
		if (index > -1) {
			entities.splice(index, 1);
		}
	}
}
function entityAddedHook(entity) {
	if (Entity.getEntityTypeId(entity) <= 63 && Entity.getEntityTypeId(entity) >= 10 ) {
		entities[entities.length] = entity;
	}
}
function minecraftButton(text, width, hight) {
	width = width || 40;
	hight = hight || 40;
	var button = new android.widget.Button(context);
	button.setText(text);
	button.setTextSize(15);
	button.setTextColor(android.graphics.Color.WHITE);
	button.setBackgroundDrawable(drawBtnBack(width * density, hight * density));
	return button;
}
function drawBtnBack(width, height) {
	var bmp = android.graphics.Bitmap.createBitmap(width, height, android.graphics.Bitmap.Config.ARGB_8888),
		canvas = new android.graphics.Canvas(bmp),
		paint = new android.graphics.Paint(),
		drawable;
	paint.setColor(android.graphics.Color.GRAY);
	paint.setMaskFilter(new android.graphics.EmbossMaskFilter([1, 1, 0.3], 0.7, 8, 4 * density));
	canvas.drawRect(0, 0, width, height, paint);
	drawable = new android.graphics.drawable.BitmapDrawable(bmp);
	drawable.setAlpha(204);
	return drawable;
}
function createPool() {
	if (pool != null) {
		pool.shutdownNow();
	}
	pool = java.util.concurrent.Executors.newScheduledThreadPool(settings.threadCount);
	pool.setKeepAliveTime(60, java.util.concurrent.TimeUnit.SECONDS);
	pool.allowCoreThreadTimeOut(true);
}
function scheduleChunk(xChunk, zChunk, delay) {
	pool.schedule(new java.lang.Runnable(function () {
		try {
			android.os.Process.setThreadPriority(android.os.Process.THREAD_PRIORITY_BACKGROUND);
			if (Math.abs(Math.floor((Z - zChunk)/ 16)) > settings.radius || Math.abs(Math.floor((X - xChunk) / 16)) > settings.radius) {return; }
			var ix = 16, iz = 16, x = xChunk + 16, z = zChunk - 1, mapDotArray = [], type = settings.map_type;
			if (Level.getTile(x - 16, 0, z + 16) === 95) {return; }
			if (!chunkLoaded(x - 16, z + 16)) {
				if (map_state) {
					scheduleChunk(xChunk, zChunk, 10);
				} else {
					delayChunksArrLock.acquire();
					delayChunksArr[delayChunksArr.length] = [xChunk, zChunk];
					delayChunksArrLock.release();
				}
				return;
			}
			do {
				do {
					mapDotArray[mapDotArray.length] = mapDot[type](x - ix, z + iz);
				} while (iz -= 1);
				iz = 16;
			} while (ix -= 1);
			if (java.lang.Thread.interrupted()) {return; }
			try {
				bmpSrcLock.acquire();
				bmpSrc.setPixels(mapDotArray, 0, 16, ((Math.floor(Z / 16) + settings.radius + 1) * 16) - zChunk, xChunk - ((Math.floor(X / 16) - settings.radius - 1) * 16), 16, 16);
			} finally {bmpSrcLock.release(); }
			redraw = true;
		} catch (e) {
			// print("drawChunk, " + e + " (" + e.fileName + " #" + e.lineNumber + ")");
		}
	}), delay, java.util.concurrent.TimeUnit.SECONDS);
}
var pointerPaint = {
	RED: (function() {
		var paint = new android.graphics.Paint();
		paint.setColorFilter(new android.graphics.LightingColorFilter(android.graphics.Color.RED, 0));
		return paint;
	})(),
	GREEN: (function() {
		var paint = new android.graphics.Paint();
		paint.setColorFilter(new android.graphics.LightingColorFilter(android.graphics.Color.GREEN, 0));
		return paint;
	})(),
}
var pointer = [
	new Pointer(
		(function() {
			var paint = new android.graphics.Paint(),
				bmp = android.graphics.Bitmap.createBitmap(displayHeight * 0.1, displayHeight * 0.1, android.graphics.Bitmap.Config.ARGB_8888),
				canvas = new android.graphics.Canvas(bmp);
			paint.setColor(android.graphics.Color.BLACK);
			canvas.drawLines([0, displayHeight * 0.05, displayHeight * 0.1, displayHeight * 0.05, displayHeight * 0.05, 0, displayHeight * 0.05, displayHeight * 0.1], paint);
			return bmp;
		})(),
		(function() {
			var matrix = new android.graphics.Matrix();
			matrix.setTranslate(-displayHeight * 0.05, -displayHeight * 0.05);
			return matrix;
		})(),
		false
	),
	new Pointer(
		(function() {
			var path = new android.graphics.Path(),
				paint = new android.graphics.Paint(),
				bmp = android.graphics.Bitmap.createBitmap(displayHeight * 0.025, displayHeight * 0.025, android.graphics.Bitmap.Config.ARGB_8888),
				canvas = new android.graphics.Canvas(bmp);
			path.moveTo(displayHeight * 0.0125, 0);
			path.lineTo(0, displayHeight * 0.025);
			path.lineTo(displayHeight * 0.0125, displayHeight * 0.015);
			path.lineTo(displayHeight * 0.025, displayHeight * 0.025);
			path.close();
			paint.setColor(android.graphics.Color.WHITE);
			canvas.drawPath(path, paint);
			paint.setColor(android.graphics.Color.BLACK);
			paint.setStyle(android.graphics.Paint.Style.STROKE);
			canvas.drawPath(path, paint);
			return bmp;
		})(),
		(function() {
			var matrix = new android.graphics.Matrix();
			matrix.setTranslate(-displayHeight * 0.0125, 0);
			return matrix;
		})(),
		true
	),
	new Pointer(
		decodeBmp("iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAABHNCSVQICAgIfAhkiAAAAEFJREFUCJltjcENgDAQw0z3HyKj3CjpJOZVIRB+WfEj8OCRdYYkr2AS25rEE2yralsBFz8sgJlh783MAHB9n4HrBiyNJZtxPPDsAAAAAElFTkSuQmCC"),
		(function() {
			var matrix = new android.graphics.Matrix();
			matrix.setTranslate(-2.5, -4.5);
			matrix.postScale(displayHeight * 0.005, displayHeight * 0.005);
			return matrix;
		})(),
		true
	),
	new Pointer(
		decodeBmp("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wUeEiAJpGBAngAAAhBJREFUOMtlk7ty1DAUhj9Zsh17SWZDZnMhYaChCSmYVFSpGIZnoU5LydPQUOxjMEC5TYqFZRg2YVA2Xt8lUchxdpPTSB7p/D7/ReLt2alrjGG1QikBcM7RWtt/36+/+gYF8P7MUlU1si0xagOAyyJ/0DBKUi6LnFGSEscRHz6VHmCtocn7y9N5SRSFPN9LAKiqmv0wQMVRD6qstRSLnJ0gIpRtfzD9veDd+ZjJZMLF+Jwnj1MALIpmkRPKlkCACoKAi8x1bZ7r7uYjrl3BcrlkOp3y9ZfhZeTYUQIr427SGCGWqMYYxt8kUgBCdEAleVFz8vMnWmsmfzb4sfBsjW36KbO8RIVS8uZkAEDbWpQKAJj/E1xdXQFwsNXy6pkkiOI1UcdfapSzhsMko7USVs7bqOT7548AnB5G7G0a4M6ZrAbnLEoEkoPddA25XS4QG47Xx3u9+rcVdw7MbwTWFV6DmdZrAEfDIaOqpqrqtTzshwHEETOt0XnobQylZJSkD/5wP0ijJMUApqoZJSnCSKDxGtiq7TNQVH69nwva0rtnvBu2cT4HIpAkW3cTKGCmNUfD4QNqfhKFbEviwQAhKpRzjpnWPqKDrV6DVT1uRbws8p6azjMcDiWEIJLbTK4zuF72SfSXQiIpgJj5TcZ2vEkYqe7FCgQacfzi6W2OCQCL6Pau27sVAgJjQfqsUZQV/wGmEfCfo9F8YgAAAABJRU5ErkJggg=="),
		(function() {
			var matrix = new android.graphics.Matrix();
			matrix.setTranslate(-8, -8);
			matrix.postScale(displayHeight * 0.0012, displayHeight * 0.0012);
			return matrix;
		})(),
		false
	)
]
function Pointer(bmp, matrix, rotate) {
	this.bmp = bmp;
	this.matrix = matrix;
	this.rotate = rotate;
}
var iconMatrix = (function() {
	var matrix = new android.graphics.Matrix();
	matrix.setTranslate(-9, -14);
	matrix.postScale(displayHeight * 0.0012, displayHeight * 0.0012);
	return matrix;
})();
var arrow = decodeBmp("iVBORw0KGgoAAAANSUhEUgAAABIAAAAXCAYAAAAGAx/kAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wkXCBYpv1t1DgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAbUlEQVQ4y+3VQQpDIQxF0fu6MV2aO4uu7HVSoRQ0n99OCl4IjnLITMjza7YpAWit8f6udpQBpRQAxhhbUBlQawWg974FJ+QV8NkClCaSATtwHuGI8N0iwoAF2DbfJIkHP+pABzrQn0G68kNc6QlKrnBddYT83gAAAABJRU5ErkJggg==");
var heads = {
0: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCRYIWPnH7AAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAA9klEQVQ4y63TO8rCQBSG4SfeJYWFIEiW4D5s7OzcQHpxDa7HytINuAix89LYBAmIjoUE/mn+JjnN3L6Z8/KdM8lkMgkQQgCtVgu83+9oTJIEtNttkV7N6FQvVfH5fEC32wVpmkbnz+czWtcnqCZ5noNerxdlLooi8uZ2u4HdbtcMQbJerwMMBgNQluUPrfODezweIMsycDqdGvagyrzdbsFisQCz2SzKfDwewX6/B5vNpiEPVqtVgOl0CobDITgcDpFwPp+D8/kMLpdLQwTL5TL8rfP9fv/3wng8jjqyfhWu12v0B0ajUSR4vV6g3+9HfVLt1yb4AgeiVR6weSbNAAAAAElFTkSuQmCC"),
10: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCAQYPHjNbAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAZklEQVQ4y2NkgIJbt279ZyABqKmpMTIwMDAwMVAIKDaAEYkN98K/f/+w28bEhKGXei7Y3KhDUiD61l8ZJIHIAmNcuPdtYFxAvVhATsoqampYFd+5dYv6SZkRm+A/pFSJ5l/GwReIAJzkF8KfuHVTAAAAAElFTkSuQmCC"),
11: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCAMf7V3OCAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAA5klEQVQ4y62SLW7DQBCFPztjKVVPUBxshfkArlmWpbgXKEyVkICCkIaUpDBSQipVKooWRcoFTH0EUx+gYOMEJCt1CgrqfWj37c/7NDPRcHB3AuhJBMDRnQB4flnyU2VZqv1+9wlATEeJJPoPSaLrgSg/yzIAFvMJALd9CUTwutoqY/r0CIBzTvlvixkA7+sP5XcnKIoCgLZtVReapgFgs9LdyPP8khzHYQgiPwf/Vfca+MW3OwLwZQ9/PhiPLjW4SSQwgU9O0xQAY4y6aK0FoKoqAB7MfWCCuq5Vsp8Dr99EfemFITgDfbg54HZ1708AAAAASUVORK5CYII="),
12: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCAAr58RpfgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABHklEQVQ4y62SvUrEQBSFvySTH2MwbmXlIlrYWlgs5D0EKxfR0lcQRLsVSztL8XV8BAtTrSKCuJs1k7E401g7t5gLdy73nPnmRu31lQP4fH8DoB5toYh0lgUANrIApCt/W6ke888wi5Umm16KpsgAcIka7GIJQF5XUq7XvAUXyIGJJZXtjVVJNXMYlJPIO/qRQxd3Uq7yMA4iwAFYKxbz2e3fhqpUHgYAqrNzAMqyDOSgvbxxAMYr2fG2UJTrYuE87UgMmL8C0H19B/qFZMNTpgfg/m4GwMXRsSwW2riHp0cATqcn2otQDIz90KaRaB8mBxMAnl9aAIrdEQBN06gvS8Wm74MxMAD0VrMO93f09lx1V+ReeVO5W/pficM4+AVghEWaSP2iTgAAAABJRU5ErkJggg=="),
13: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCAIGkC1XiQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABPUlEQVQ4y62SsUrDUBSGv6RN7GoICAmYIUMha3ffQkTcBMFd3ayLg+gT2FX0DXTzCdybUSkSCo1DSpJCQ5M43N7E4BTas9x7zr3c+53/P7BhKABBEJQAZVkCMJ/PqwtFUVT7JEkAMAwDgH6/r3Tl4XQ6bbwcRdG/B2TEcYzjOACoAFmWtUaXtBWB/zoSha4orfJc5J2O6FXrAZAmMQD7J5c1ga7rrQlka5WIrusCsFgsAHi6OQVguRTtnd0/ix9VVRD7Pp7nKepWbJxMJuVoeA6As7crEFfZWoumC98/wsqjizsGg8EWCcIwBODt8RaA4cFh4+L1+wsAx1cPSOsrAulpmzBNszkHs9lMqL4eqo+vTwB6O70msqI0chUgTdPWBJqm1RqMx+Py70jbtl3/oNY65+vplKtlWcqmJvAL4KV5Q1seyu0AAAAASUVORK5CYII="),
14: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCA4dtv3RaQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABAklEQVQ4y7WSoU9CURTGf/eNgmw8QOsLb6MInWiyWSxsOjYpEBzNLAmS1TEC+hdgMIhBTUQ6WuDdwIYN35w0eJfwvIznnMXLl87Z+W3ft3OO4Fuj4atiQ9l8Tmz2zw89BeC6bmRu8U/FdCGl/BPUzj85cwkye7sALJcBAE+9RwUgRLiKme8DkEylt5RgOn0H4Gs+B8C2kxFw7HkA7MTjZhOsbx0EgQJIpTMANCrHEbB+cw+A/zELnS1LmE3QujxXAJ+LBGenJwDsHxwC8NZ/AeD66gLHzQNQa7YNf+JEDsPtO4X1UDtr2U6BiRxs6Q+0c7FY4qhc/RW+u+3Q7equbybBCgRARDqUFxSFAAAAAElFTkSuQmCC"),
15: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCA0M92CiWAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAA5klEQVQ4y2NcVx7zn4GBgeH7+68MDAwMDJyC3AzIfHSALs/EQCFgQRfAZTMuQLELBt4AFpifG7bsJkljg48rlVwAi9ebTz4xMDAwMHB0QcycesMHRWG2xhYGBgYGhh9l/xgYGBgYNlTGYY9GBgYGhv/fGRi+/fqNIcbIiamWsdbL4D8DAwODmowMAwMDA8MvBi6Gb79+M7x6dR9FoayMDAMXOyvD/58Qg289eUKjlHjg+DmGX3//Magp8KGI7z1yjYGNmYnBzVKDyukAXcDGWJnh268/DO8+vEURtzBQZOBiY6F+SgQAkglD+wSBimYAAAAASUVORK5CYII="),
16: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCAwtohKDRwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAzElEQVQ4y63SL07EUBDH8U9JIRiCgWs8w6aXqOMANeBwGCwXwIFAYNBkXS/RBNMDYGrr1vCnSRH0JbwVK7b9mcn8Mu/NNzOTPTgc4VgGPo3g/PXFfzVNk+Rnj8/gwEzlsXNUzPM8T/yiKMBHdfVHONXNJ7jxnRhPjsAwDIm/qa7BvZ/En0+wbcQtfPU9GG/vdn4wmyCLd7CvlpvBZoqX7fvOB29hBU6nWS1HEDuHEEBZlklhXdegbVuwDhcLE3Rdl3TupzuI2iY6WWoLv5WmMMWCKVO2AAAAAElFTkSuQmCC"),
17: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCAwLcB8GugAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAA30lEQVQ4y51TOw6CQBB9ECsLDZEQYOmsOJwn8AAWHsDewiPYeQJCKCyIpQmLhkAIFrTauJtd2QXkdTuz8+bNz8AXiyB84w+8stQAgJlonC9XsGyHv12PAACeDwoAqMsCANA2Ff9jqthdj8D1CEjgS0QqmDoHCxZJRHWDBAw0y3v9EoFlO5L0MegoiM9H7LebTvbTYQeaXIYJbneqzabyGeIekHXIO04CX1l/ek3QNhXfA0lBXRZ85kPNGz2F37FOImDBTN0kBbqSzDHZaZYrs/cSsIA4irTBnWsUL26s/QOMaVD4M/hBCgAAAABJRU5ErkJggg=="),
19: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCBwN076x3gAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAA0klEQVQ4y7WTvw5BMRSHv+ISQlKuBIk/YWTwBGaDN/CA3sBgNpgNrEJILJcmIsgl10BFBYv6TT3tl/ac8+sRnVYzAMhIB4CN8gHoD8eCJ33iQvyoiF4UcvGvoH5Zc9YyELo2JxwYB4nYxYjP93C7u3HRqGMpg9cue94agFopa4DzlQIgmZIADEYTYdcFLdfNA3A4HgDY7U8AyHT27QX2eqCUCgCkvNXYbTcMsDeYaI47J/7jgtbrv/Avxmg8ZsW+C9O5B8BssTT2q+UiAPWKa9eFKwzDPzoKq7SSAAAAAElFTkSuQmCC"),
20: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCBYPx184eAAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABDklEQVQ4y62Rv07CUBSHv0sLFHExJiwyiDHpaIirg4NxZOFJHHwKfQOegA13BgcHq4kO4CoOLBCqCX+KbamX4V4MTZCYtGc553fPub/zJUc4jiNZD0PLSOcf/ayLIPABECIDQIaEYQ4fW8rREADkrKLamM3pEUUShaFWSvthkBLBgX0CwHzsbp8sxOWuzokJxOWpLZMYJCf4eL2XAIfV81ij224C8N55BqB2dRvrv9w1UrrC1B0AcE0FgBt6AHSeHjZ+WM39Gvzl7H37/yNYFf2LEgD1xT7hIkLuqU2fmrB2ViVrGvRNI+UrdNtNCRDMxgBMZh5Tb85bbwTAlzsE4LhksWPlKRbyAJSP7HQIlhjFT+sbTWH0AAAAAElFTkSuQmCC"),
21: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCBUEe6CyMwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABNElEQVQ4y52TPWrDQBCFP6/cqhEI4dYHSKFG+ABWKdw7BwiBQO6QKo2bNDlAUrgLKnOBsI3AOYDbIAxpUgun2MzuaB1DyMCi+Xk7q3lvd7KpOQJUc7B7EB/G8bmaAWhWJUUeAEXuloCLHJoKbzo2AP1754uXjwnLu8QDAZiVpzlUg9iydHAbZiUAy+sdAA+vCa11mP7gvlPZ1FoHyNLBN2lfulFTaQKDH88AFBclfzVpJDblH/b8FnPw0dFUcFOH7utFAOl8bKM/0FLF+uuGumaE0dbipXJEOYD4Oq9zk03NsZo7/WOyPr+Ss76MZfS1zNLBLx3/5guRRhMlp+h549nj+OQmrheBTAFvb90S296XvmaE0aaCp6sgl94gV9qf/iO7l9HuQSvY2vAS5bHp59wfAm/fWoh3ZA08iW0AAAAASUVORK5CYII="),
22: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCBkk7Hvd9wAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAiklEQVQ4y2NgoBAwwhiXem3/w9h6xYcZ0RXikmei1AUUG8CI7LTLz3/AJTzd5OHs7bsewtm6khwMyF4ZeC+w/HaYAOcUTQxFeIEB4YWiV2/h7G2Rq5G0Gw+CWGB5fLkezlmfFg1nR7eeQYhXI8SR1Q+ShPT8SRY8IX29yUdQA7f6JzhbUmbaIEhIAMXkKewS1cHBAAAAAElFTkSuQmCC"),
32: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCAUPprB56gAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABG0lEQVQ4y62TsU7DQBBEn2OHWMEJBRAiKwVFQIiCDilFynwISFT5GUo+hYqClgYJiYY+SEgYkHU4tmxsiomLq3Pb3Gl3b2f2dse7vDlpAOocAHqhB4BJSwCqtc5OECi+21Vi1cjPlha0yK0VuSoPR30A+nEtpErIyZseFHXliEF7OZ5OANjpyhWFYpDnGQC1r7/x4wSANCscMZiMx6qslsiMeqw6cqTGAHAY72k6Zm0hb8+gF6rnh7sXK7BYngl5KOT722crPr8+d8PAmy+1iaP9AwAGfgTA0+OrlXixOAVg9bEC4Ps9c8RgdjVtAJpAG5f/6PcHoV37M9Hco6MQgNL8OZrC1yrVpiENBBvVFb/Y6ttYnSmvLBxp4R/CM1dNZKkXNgAAAABJRU5ErkJggg=="),
33: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCAkN5AtXygAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABUklEQVQ4y63TP0iVcRTG8c81/2CKovctwxJBEDRvOEZSbQXR4thSLq5iy4VECFHukn9Cve7u0RDYcJGoJDBQJ8OoQW2wNBwquChqvg6/SXDzPduBB873nPM8qelPozE8/54F16s6QHf0BNy+eBe8SufB3u4BWJ3/AUqcs1LNuUsx3LiVAT//bID2KPSbH7ZBy6NaUPwWCLLRi2QISq90VYKl3AqovxCB1tF28LuiCAq9yyBdmQbVY9UJEZRVlIP4IAW+LqyDLyOL4F/zr0Cy8BccZmIwWRxMiKCr/D643L8GOvM3Qb5vJiiOw4y3n9+A4bkhsF26lZAPppZyMbx+Nxd2fb8TblFYPyVsuBd8cOdl8Mfj4tOEbtBS3wqiqgbwsbB4pnBnPnxhf+M/mFgbT4hgdm8SXHtwFdRlakD/bA9oOmoDz7IDIRvLuyErDxuTITgBE2ldifRSs+UAAAAASUVORK5CYII="),
34: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCAYvtvMK4QAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAA+ElEQVQ4y63QO4oCURCF4c9xaPEFbSqigTvQNRi7GEOhA6FTIzfiNtyBYKShIohvUJzoBjeZxD5RFXWqzk+V5vP5B57PJ6hWq+BwOID7/Q4qlQpoNpvg/X6DH1/qNyQHhcROpwPa7TZ4vV5gvV6Dx+NREEEoBoMBKJfLoNVqgev1Gi0EkuPxWBBBv9+PLp9OJ3C73cB+vwe9Xi9KDvqeoF6vg9lsFg2yLIuSp9NpNJ9MJsUQlBaLxQe63S6o1WpguVxGxvF4DDabDdhutwX9IHw7z/N/javVKupHo1FBBLvdDgyHQ5AkSWRoNBrgcrmANE3B+XwuhuAP0cRYqLWs0nQAAAAASUVORK5CYII="),
35: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCAc7tTLv3QAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABDklEQVQ4y63Su0oDYRAF4C8XNUkRRLGSIGiEYFBJoeRdrGx9HVFfwNInsLSKNmJALVSwSSWIwZD7uha7ARPsstP8c4bhP4czJ1Wv7YRwdP8Erg73/K3ROAD9wQCsP76CVnUbpM1Z2fDnZ4q5eNcE7YNdEARjcBwzn22WQEGYjILUqeiriYJ0JgV6/REYDodgIZsFnW4fNF/eE/LgOm7GQeT2zd0jOI/nJ/E7wRfbG1N4fgWtahnkwmmm65nFWXy5X0noCrWdrRDyuVx03/wS+O50wefXN1hdKcbzHsjnFxPyYNIUltdAo3ELKuVSbHOUi4fnN1Cv16OctD8SVhCG4b8Li9nMFA7ivExyM7eCX2nPVFxK67LHAAAAAElFTkSuQmCC"),
36: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCAsVxVGtHgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABU0lEQVQ4y63Tv0vUcRzH8cdVV2c/1O8p6qUgDiWCkJGDNAj5BwROLerSUP0BgZDrDbmFg3EiIjXc0tDQckRzXR0ELsGhmHFqni13h5IY1/BZvNnve3zD682T9/P9TuTz+SZ8+LEMRm6Og3eFN87W+vBjkG7vBsm2JLjgnHXp6vUrYPb+C/C6+BKM3bsDSsUS6O3NhMSNVMuA8xMcNf6C/XoVjPeMgWqlBjL9uy2Bf7VjcLG9LR6CRLovakKyuw5eLbwFuY8LIJuYBEOjYSedc3MgFUUxEeRWck2oHv4GX4vfwFG6DJYmngf/mb6QqP4C05/nY7JQO/4DGifBwuj+QfDfnwDPvmTB1NYgeDL7KPQvz8REUK58B59K70FHFC6uZ+cWOO3cBIWBbfDwZ9jB4t5qTAQP7k6Dw/oeqBzshG/ragT/HbdBubIBnpbXQtC1eAj+A9SNWsc6q4V1AAAAAElFTkSuQmCC"),
37: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCAoFwf2MOwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABRUlEQVQ4y32Ty27CMBBFz4ydpGxAILGrivo3/Yv+Z7+mrJESwaalJDNdmDxMgMkmdnKP53Etn18fzk20547joQZgtd0Qq8CjiABujrWOe2LZxXAb39sbkYigURCVBLDWOTUNdjGmQIBT3SAqGUALZbleE8orwN3TSedulmJ38btp99nGfvP3W+n+xp+rnWWi817HHpXKaksOuBsThrsjIrNf9ClAwa/Pwym05y7ren8axkzY150BjocaN6d8Hcc4FQsp7erNhnVcWO6Du4XZk7LMB3/E1XaDXYxT3Qwjc/M0e4OffdItdpJ5pPdHjFWghcwsGvRuvSio6NzKtzGIFRbv82+hUJabNVpoAojIuLixssb57EMVCGUglFdNKJO3p5fpVDcALDdrRMG6KzAIGpM4K6HfALKeaKGEQml/052MLzHr1z+EQa7SLRnZJQAAAABJRU5ErkJggg=="),
38: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCA46E/dkAgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAf0lEQVQ4y7WTsQqAMBBDX0U6dOoi+CvOTp39Tj/B2cn/EJxcu9TJoQe1hdZsdxdISDhljAkAWmsAvPd8QfI6KtHnFOReot6BVHznlKLk1TvIpZ5CuxYOdwNwrgqA0QUApm2IiPt8xbwltHGgrLWhpPfUvV0LpYrtWyj9wt8yeAASSTd0D702yQAAAABJRU5ErkJggg=="),
39: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCA8c2OHQvgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAApUlEQVQ4y2NgoBAwVjUV/GdgYGBoq5vAiE0BTB5ZDbIYE6UuoNgAFpizkira4c6a11EJ986b5xwYmpDFBt4L8Fhg+MEFF/z+/TsDAwMDw4cPH+BivLy8GJonTZrEOAi8AGNkZmb+Z2BgYNi0aRNcMiEhAc5esGABnO3j48PAwMDAICLDNRhiIS2z4j8DAwPDr+8vMCS5+GQQCv++x5CfOnXqIIgFABSwMEHtJUHQAAAAAElFTkSuQmCC"),
40: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCAgpwROCWgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABJ0lEQVQ4y63Tu0okQRTG8V+P4+iMVxAREdlARBREEQyN9Gl8AU00MTYSfBhxTcRoYdlIYRdNnEAUBS+DOtNjb3C6A03tSr46RdU5/zqXpLawmsH++S+wtbIGpJ3Q9hvIWs9g4/oSHE/NgIpvrqRvfiWDnvoAWP99Cn7mJOlLRN7/+wfsjE/Gw2qtJIIDMtidXwYf/UHy0WqFFrnI1/DjHWje35ZDUD0qdp0ueLg4A4f58Wauhb03NvHJ/j7ByY9ZUM//Wng++nKxsF8rvWB7uqw+qM0uZlAtkKoRofvyCN6fn0BvXv9u3pFJY6CkHJCEx3oDvDWvov6DI9GJlZ7Q63+gMbcUJO12WQRp1D9L0/DcielLsuG4UesPfbiJB0OjMaQ3zXII/gMiIliJjt3yRAAAAABJRU5ErkJggg=="),
41: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCAoohCLQTgAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAA30lEQVQ4y6WTsQ2EMBAEx+gDpAtphArcAxk1UBA1kFGAM1dAH4jQFhkf2TLG/tfrV0Iye+hub70o7/1FBudcPItIlQNoQjF9rLW3ZjUOQHnvr/ASPtJaU0JeF5F7g18hIqh93y/+wCuVN8/zrbgsCwDjON74aZriGo8Vwp7DMHAcBwBd17Gu68MfEaFp2/Yhq2RiiXPO0ZznWdwtTE/PeRMRQRljool93380zFqL1ppt2yKn0iSGwNRyUEpiVPBteo6gIirIw5RfXbjSXIUyxly/Tk9V/B/l2u+cGlXjAN472J2vHjgcIgAAAABJRU5ErkJggg=="),
42: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCBAAAbqCbwAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAAuElEQVQ4y2MUYGD4z8DAwPCBARUIQWkRNPFbUJoFSjMxUAgYOaEugAFuKC0As0EYyngLod5Aub+o5gJeqAu2oEl4o/G3ovF9qeYCGagL7tlCBQ5CaA2o0c+gCj/9g9D/7SG0ymFquYAP6gIJmAg01J9BQ/0LVFgSSvOiGUC5C3jQ0sEXtPQAcxkzTAEbqlModwEDmgs40fICNywzvMFuAMUuYEEXkIX5kQ9CvYPa/BUq/B1KK1PLBQBzxx7wSCywogAAAABJRU5ErkJggg=="),
43: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCBUf8cV73wAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABF0lEQVQ4y62SsUoDURBFzxoxRFdQBMNGRNBgIYKF2AYCWu1H2Imd+hX+gq1fYG2phU0QLFSCqCghGzQJAZMYjMqzuGOxdd40d+bOe8zlzgQflbwDCDtvAFBaAaBx9gRAtCmavuFGSfhdB2CMEWO828oAEC6ti7m8TU+2aFSF0VRPSbXvR0FwfoAD2IlF1F+EC1v2opnm/+P+Dk8eRGuWbe8DUA5PAXi4GWhyRe3yYU58b1cKjk48eRAX5cHxnoikJXTvwuVZ4XPHPswL8+BLwaoUTP+mGxc6ROasjovC10LB1pJ42kJmQsl1zZif0Cbr4tpGXz3afbgkpXB0DxYn5UEW7XngtP9coHrmU/UwK6nNr6Fp96TgD68IS+Ryu2FhAAAAAElFTkSuQmCC"),
44: headArrow("iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsQAAALEAGtI711AAAAB3RJTUUH3wkVCBoQ5uJ6gQAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAABJUlEQVQ4y62TvU4CQRSFv/2DBWRR/AkkBht7H8NSKxPfwIreyk5fwWegsbGxsyOxsDUWKmY1QUUxmtVddmfGYpfEydKxp7w5Oee7k7nG8VlXAVz2+wCUKw6pBP/17gcAuKoMQGhEAJjMKXvgPwIQBTEASujNk1AC4FRsAOpiIeWzREEEo5fPbOU0cRIIrbnVXgagWnUBaDZWAHi9HhVEMHx+A+CuN5hpuOdh5ryz0ymIYJpxdXMOwOneIQAX6x+acfupCcBB7wSA/aPuNCCvUAhELHMz17JyXmNrd1MB2G6WJRUilqwlevZXA+ySxe9PAkASJoW9ga6x/41MJIurHgClDHt4O8a0TZY2PM1fPIHXriFiiUpPg0imP7PeqmE5+b65Cf4AjI9iM/4hVAEAAAAASUVORK5CYII=")
};
function headArrow(string) {
	var head = decodeBmp(string),
		bmp = android.graphics.Bitmap.createBitmap(arrow.getWidth(), arrow.getHeight(), android.graphics.Bitmap.Config.ARGB_8888),
		canvas = new android.graphics.Canvas(bmp);
	canvas.drawBitmap(arrow, 0, 0, null);
	canvas.drawBitmap(head, 1, 6, null);
	return bmp;
}
function decodeBmp(string) {
	string = android.util.Base64.decode(string, 0);
	return android.graphics.BitmapFactory.decodeByteArray(string, 0, string.length);
}
function drawBorderBmp() {
	var bmp = android.graphics.Bitmap.createBitmap(settings.window_size, settings.window_size, android.graphics.Bitmap.Config.ARGB_8888),
		canvas = new android.graphics.Canvas(bmp),
		paint = new android.graphics.Paint();
	paint.setMaskFilter(new android.graphics.EmbossMaskFilter([1, 1, 0.3], 0.7, 8, 3 * density));
	switch (settings.style_border) {
	case 1:
		paint.setColor(android.graphics.Color.rgb(153, 135, 108));
		break;
	case 2:
		paint.setShader(new android.graphics.LinearGradient(0, 0, settings.window_size * 0.5, settings.window_size, [android.graphics.Color.GREEN, android.graphics.Color.YELLOW, android.graphics.Color.GREEN], null, android.graphics.Shader.TileMode.REPEAT));
		break;
	default:
		return null;
	}
	canvas.drawPath(createPath(true, true), paint);
	return bmp;
}
function createPath(outer, inner) {
	var path = new android.graphics.Path(),
		size = settings.window_size;
	path.setFillType(android.graphics.Path.FillType.EVEN_ODD);
	if (settings.style_shape === 1) {
		if (inner) {path.addCircle(size / 2, size / 2, size / 2 - (7 * density), android.graphics.Path.Direction.CW); }
		if (outer) {path.addCircle(size / 2, size / 2, size / 2, android.graphics.Path.Direction.CW); }
		return path;
	} else {
		if (inner) {path.addRect(7 * density, 7 * density, size - (7 * density), size - (7 * density), android.graphics.Path.Direction.CW); }
		if (outer) {path.addRect(0, 0, size, size, android.graphics.Path.Direction.CW); }
		return path;
	}
}
function chunkLoaded(ix, iz) {
	var iy = 130;
	do {
		if (Level.getTile(ix, 130 - iy, iz)) {return true; }
	} while(iy -= 10);
	return false;
}
mapDot = [
	function basicSurfaceMap(ix, iz) {
		var iy = 130, deltaY = 10, colors = {1: -8487298, 3: -7970749, 4: -8487298, 8: -14000385, 9: -14000385, 10: -637952, 11: -637952, 12: -2370656, 13: -8618884, 17: -10005725,
											 18: -13534192, 24: -3817840, 48: -10193052, 78: -984069, 79: -5255937, 82: -6314831, 98: -8487298, 99: -7509421, 100: -4774107,
											 109: -8487298, 110: -9542807, 128: -3817840, 159: -2968927, 161: -8028101, 162: -13293288, 172: -6857405, 174: -5255937, 243: -10797283};
		do {
			if (Level.getTile(ix, iy - 10, iz)) {
				if (deltaY === 10) {
					deltaY = 1;
					iy += 10;
				} else {
					return colors[Level.getTile(ix, iy - 10, iz)] || -8540361;
				}
			}
		} while (iy -= deltaY);
		return 0;
	},
	function minecraftMap(ix, iz) {
		var color, block, iy = 130, deltaY = 10, o = android.graphics.Color;
		do {
			if (Level.getTile(ix, iy - 10, iz)) {
				if (deltaY === 10) {
					deltaY = 1;
					iy += 10;
				} else {
					block = Level.getTile(ix, iy - 10, iz);
					switch (block) {
					case 9:
						if (Level.getTile(ix, iy - 19, iz) === 9) {return -13882190; }
						if (Level.getTile(ix, iy - 16, iz) === 9) {return !(ix % 2) === !((iz + 1) % 2) ? -13882190 : -13224231; }
						if (Level.getTile(ix, iy - 14, iz) === 9) {return -13224231; }
						if (Level.getTile(ix, iy - 12, iz) === 9) {return !(ix % 2) === !((iz + 1) % 2) ? -13224231 : -12632068; }
						return -12632068;
					case 12:
						if (Level.getData(ix, iy - 10, iz)) {color = 0xd57d32; } else {color = 0xf4e6a1; }
						break;
					case 35:
					case 159:
					case 171:
						color = [0xfcf9f2, 0xd57d32, 0xb04bd5, 0x6597d5, 0xe2e232, 0x7dca19, 0xef7da3, 0x4b4b4b, 0x979797, 0x4b7d97, 0x7d3eb0, 0x324bb0, 0x654b32, 0x657d32, 0x973232, 0x191919][Level.getData(ix, iy - 10, iz)];
						break;
					case 5:
					case 85:
					case 157:
					case 158:
						color = [0x8d7647, 0x7e5430, 0xf4e6a1, 0x956c4c, 0xd57d32, 0x654b32, 0, 0, 0x8d7647, 0x7e5430, 0xf4e6a1, 0x956c4c, 0xd57d32, 0x654b32, 0, 0][Level.getData(ix, iy - 10, iz)];
						break;
					case 43:
					case 44:
						color = [0x6f6f6f, 0xf4e6a1, 0x8d7647, 0x6f6f6f, 0x973232, 0x6f6f6f, 0xfcfcfc, 0x6f0200, 0x6f6f6f, 0xf4e6a1, 0x8d7647, 0x6f6f6f, 0x973232, 0x6f6f6f, 0xfcfcfc, 0x6f0200][Level.getData(ix, iy - 10, iz)];
						break;
					case 54:
						chests[chests.length] = [ix + 0.5, iz + 0.5];
					default:
						color = {2: 0x7db037, 3: 0x956c4c, 6: 0x007b00, 8: 0x3f3ffc, 10: 0xfc0000, 11: 0xfc0000, 17: 0x8d7647, 18: 0x007b00, 19: 0xe2e232, 22: 0x4981fc, 24: 0xf4e6a1, 30: 0xfcfcfc, 31: 0x007b00, 32: 0x8d7647, 37: 0x007b00, 38: 0x007b00, 39: 0x007b00, 40: 0x007b00, 41: 0xf7eb4c, 42: 0xa5a5a5, 45: 0x973232, 46: 0xfc0000, 47: 0x8d7647, 49: 0x191919, 53: 0x8d7647, 54: 0x8d7647, 57: 0x5bd8d2, 59: 0x007b00, 60: 0x956c4c, 78: 0xfcfcfc, 79: 0x9e9efc, 80: 0xfcfcfc, 81: 0x007b00, 82: 0xa2a6b6, 83: 0x007b00, 86: 0xd57d32, 87: 0x6f0200, 91: 0xd57d32, 99: 0x8d7647, 100: 0x973232, 103: 0x7dca19, 104: 0x007b00, 105: 0x007b00, 106: 0x007b00, 107: 0x8d7647, 108: 0x973232, 110: 0x7d3eb0, 111: 0x007b00, 112: 0x6f0200, 113: 0x6f0200, 114: 0x6f0200, 121: 0xf4e6a1, 128: 0xf4e6a1, 133: 0x00d639, 134: 0x7e5430, 135: 0xf4e6a1, 136: 0x956c4c, 141: 0x007b00, 142: 0x007b00, 152: 0xfc0000, 155: 0xfcfcfc, 156: 0xfcfcfc, 161: 0x007b00, 162: 0x8d7647, 163: 0xd57d32, 164: 0x654b32, 170: 0xf7eb4c, 172: 0xd57d32, 174: 0x9e9efc, 175: 0x007b00, 183: 0x7e5430, 184: 0xf4e6a1, 185: 0x956c4c, 187: 0xd57d32, 186: 0x654b32, 243: 0x7e5430, 244: 0x007b00};
						color = color[block] || 0x6f6f6f;
					}
					if (Level.getTile(ix - 1, iy - 9, iz)) {
						return o.rgb(o.red(color) * (180 / 255), o.green(color) * (180 / 255), o.blue(color) * (180 / 255));
					}
					if (Level.getTile(ix - 1, iy - 10, iz)) {
						return o.rgb(o.red(color) * (220 / 255), o.green(color) * (220 / 255), o.blue(color) * (220 / 255));
					}
					return o.rgb(o.red(color), o.green(color), o.blue(color));
				}
			}
		} while (iy -= deltaY);
		return 0;
	},
	function caveMap(ix, iz) {
		var count = 0, block = 1, blockNew, iy = 96, y, r, g, b, increment = 3;
		do {
			blockNew = Level.getTile(ix, iy - 3, iz);
			switch (blockNew) {
			case 0:
			case 17:
			case 18:
			case 20:
			case 50:
			case 64:
			case 66:
			case 106:
			case 127:
			case 161:
			case 162:
				blockNew = 1;
				break;
			case 8:
			case 9:
				blockNew = 0;
				if (count > 1) {r = r || 1; g = g || 1; b = b || 255; blockNew = 1}
				break;
			case 10:
			case 11:
				blockNew = 0;
				if (count > 1) {r = r || 255; g = g || 1; b = b || 1; blockNew = 1}
				break;
			case 4:
			case 48:
				blockNew = 2;
				if (count > 2) {r = r || 1; g = g || 255; b = b || 255}
				break;
			case 97:
			case 98:
				blockNew = 2;
				if (count > 2) {r = r || 255; g = g || 1; b = b || 255}
				break;
			case 54:
				chests[chests.length] = [ix + 0.5, iz + 0.5];
			default:
				blockNew = 2;
			}
			if (blockNew !== block) {count += blockNew; y = iy}
			if (count === 5) {
				iy += 3;
				increment = 1;
				count = 6;
				blockNew = 1;
			} else if (count === 8) {
				r = r || 150; g = g || 255; b = b || 0;
				return android.graphics.Color.rgb(r * (0.8 * (y / 127) + 0.2), g * (0.9 * (y / 127) + 0.1), b * (0.9 * (y / 127) + 0.1));
			}
			block = blockNew;
		} while (iy -= increment);
		y = y || 127;
		r = 255; g = 255; b = 255;
		return android.graphics.Color.rgb(r * (0.8 * (y / 127) + 0.2), g * (0.8 * (y / 127) + 0.2), b * (0.8 * (y / 127) + 0.2));
	}
];
function checkRenderDistance() {
	var options = load(android.os.Environment.getExternalStorageDirectory().getPath() + "/games/com.mojang/minecraftpe/", "options.txt").split("\n"), i;
	if (options != "") {
		for (i = 0; i < options.length; i += 1) {
			options[i] = options[i].split(":");
			if (options[i][0] === "gfx_renderdistance_new") {
				return Math.round(parseInt(options[i][1], 10) / 16);
			}
		}
	}
	return 6;
}
function saveSettings() {
	var settingsString = "", p;
	for (p in settings) {
		if (settings.hasOwnProperty(p)) {
			if (settingsString !== "") {settingsString += "\n"; }
			settingsString += p + ":" + settings[p];
		}
	}
	save(android.os.Environment.getExternalStorageDirectory().getPath() + "/games/com.mojang/minecraftpe/mods/", "minimap.txt", settingsString);
}
function changeMapState() {
	var i;
	map_state = !map_state;
	mapWindow.resetVisibility();
	if (map_state) {
		delayChunksArrLock.acquire();
		i = delayChunksArr.length;
		while (i--) {
			scheduleChunk(delayChunksArr[i][0], delayChunksArr[i][1], 0);
		}
		delayChunksArr = [];
		delayChunksArrLock.release();
		scheduledFutureUpdateMap = poolTick.scheduleWithFixedDelay(runnableUpdateMap, 1000, Math.round(1000 / settings.delay), java.util.concurrent.TimeUnit.MILLISECONDS);
		scheduleChunk(Math.floor(X / 16) * 16, Math.floor(Z / 16) * 16, 0);
	} else {
		scheduledFutureUpdateMap.cancel(false);
	}
}
function settingsChanged(key) {
	switch (key) {
	case "radius":
		var i, j, widthOld = bmpSrc.getWidth(), widthNew = ((settings.radius + 1) * 2 + 1) * 16, xChunk = Math.floor(X / 16) * 16, zChunk = Math.floor(Z / 16) * 16;
		try {
			bmpSrcLock.acquire();
			bmpSrcCopy = android.graphics.Bitmap.createBitmap(widthNew, widthNew, android.graphics.Bitmap.Config.ARGB_8888);
			canvasBmpSrcCopy.setBitmap(bmpSrcCopy);
			canvasBmpSrcCopy.drawBitmap(bmpSrc, (widthNew - widthOld) / 2, (widthNew - widthOld) / 2, null);
			bmpSrc = android.graphics.Bitmap.createBitmap(widthNew, widthNew, android.graphics.Bitmap.Config.ARGB_8888);
			canvasBmpSrc.setBitmap(bmpSrc);
			canvasBmpSrc.drawBitmap(bmpSrcCopy, 0, 0, null);
		} finally {
			bmpSrcLock.release();
		}
		minZoom = settings.window_size / (settings.radius * 2 * 16);
		absZoom = (100 / settings.map_zoom) * minZoom;
		if (widthNew > widthOld) {
			for (i = (widthOld - 16) / 2; i <= settings.radius * 16; i += 16) {
				for (j = 0; j < i; j += 16) {
					if (map_state) {
						scheduleChunk(xChunk + j + 16, zChunk + i, 0);
						scheduleChunk(xChunk + j, zChunk - i, 0);
						scheduleChunk(xChunk - j, zChunk + i, 0);
						scheduleChunk(xChunk - j - 16, zChunk - i, 0);
						scheduleChunk(xChunk + i, zChunk + j, 0);
						scheduleChunk(xChunk + i, zChunk - j - 16, 0);
						scheduleChunk(xChunk - i, zChunk + j + 16, 0);
						scheduleChunk(xChunk - i, zChunk - j, 0);
					} else {
						delayChunksArrLock.acquire();
						delayChunksArr[delayChunksArr.length] = [xChunk + j + 16, zChunk + i];
						delayChunksArr[delayChunksArr.length] = [xChunk + j, zChunk - i];
						delayChunksArr[delayChunksArr.length] = [xChunk - j, zChunk + i];
						delayChunksArr[delayChunksArr.length] = [xChunk - j - 16, zChunk - i];
						delayChunksArr[delayChunksArr.length] = [xChunk + i, zChunk + j];
						delayChunksArr[delayChunksArr.length] = [xChunk + i, zChunk - j - 16];
						delayChunksArr[delayChunksArr.length] = [xChunk - i, zChunk + j + 16];
						delayChunksArr[delayChunksArr.length] = [xChunk - i, zChunk - j];
						delayChunksArrLock.release();
					}
				}
			}
		}
		redraw = true;
		break;
	case "map_type":
		if (pool.getActiveCount() > 0) {
			createPool();
		}
		X = undefined;
		break;
	case "map_zoom":
		absZoom = (100 / settings.map_zoom) * minZoom;
		redraw = true;
		break;
	case "map_alpha":
		mapView.setAlpha(settings.map_alpha / 100);
		break;
	case "window_rawSize":
		settings.window_size = (settings.window_rawSize / 100) * displayHeight;
		var lp = mapView.getLayoutParams();
		lp.height = settings.window_size;
		lp.width = settings.window_size;
		mapView.setLayoutParams(lp);
		redraw = true;
		bmpBorder = drawBorderBmp();
		if (settings.style_border !== 0) {
			pathBorder = createPath(false, true);
		} else {
			pathBorder = createPath(true, false);
		}
		redraw = true;
		minZoom = settings.window_size / (settings.radius * 2 * 16);
		absZoom = (100 / settings.map_zoom) * minZoom;
		break;
	case "window_rawPosition":
		mapWindow.hide();
		mapWindow.show();
		break;
	case "style_shape":
		if (settings.style_border !== 0) {
			pathBorder = createPath(false, true);
		} else {
			pathBorder = createPath(true, false);
		}
	case "style_border":
		if (settings.style_border !== 0) {
			pathBorder = createPath(false, true);
		} else {
			pathBorder = createPath(true, false);
		}
		bmpBorder = drawBorderBmp();
		redraw = true;
		break;
	case "style_pointer":
		redraw = true;
		break;
	case "show_info":
	case "show_zoomBtn":
		mapWindow.resetVisibility();
		break;
	case "delay":
		scheduledFutureUpdateMap.cancel(false);
		scheduledFutureUpdateMap = poolTick.scheduleWithFixedDelay(runnableUpdateMap, 1000, Math.round(1000 / settings.delay), java.util.concurrent.TimeUnit.MILLISECONDS);
		break;
	case "threadCount":
		pool.setCorePoolSize(settings.threadCount);
		break;
	}
}
function settingsClosed() {
	saveSettings();
}
function settingsUI() {
	var textSize = 17,
		padding = 10,
		context = com.mojang.minecraftpe.MainActivity.currentMainActivity.get(),
		alert = new android.app.AlertDialog.Builder(context),
		scroll = new android.widget.ScrollView(context),
		layout = new android.widget.LinearLayout(context),
		i,
		len = arguments[0].length,
		ruler,
		rulerLp = new android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.MATCH_PARENT, 2),
		addOption = {
		checkBox : function (args) {
			var layoutElement = new android.widget.RelativeLayout(context),
				checkBtn = new android.widget.CheckBox(context),
				checkBtnLp = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT),
				text = new android.widget.TextView(context),
				textLp = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
			text.setTextSize(textSize);
			text.setText(args[2]);
			checkBtn.setId(1);
			checkBtn.setChecked(Boolean(settings[args[1]]));
			checkBtn.setOnCheckedChangeListener(function(buttonView, isChecked) {
				if (isChecked) {settings[args[1]] = 1; } else {settings[args[1]] = 0; }
				settingsChanged(args[1]);
			});
			checkBtnLp.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
			checkBtnLp.addRule(android.widget.RelativeLayout.CENTER_VERTICAL);
			textLp.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
			textLp.addRule(android.widget.RelativeLayout.CENTER_VERTICAL);
			textLp.addRule(android.widget.RelativeLayout.LEFT_OF, 1);
			layoutElement.addView(checkBtn, checkBtnLp);
			layoutElement.addView(text, textLp);
			layoutElement.setPadding(padding, padding * 0.5, padding, padding * 0.5);
			return layoutElement;
		},
		subScreen : function (args) {
			var text = new android.widget.TextView(context);
			text.setTextSize(textSize);
			text.setText(args[1] + " >");
			text.setPadding(padding, padding, padding, padding);
			text.setOnClickListener(function(v){
				settingsUI(args[2]).show();
			});
			return text;
		},
		sectionDivider : function (args) {
			var text = new android.widget.TextView(context);
			text.setTextSize(textSize * 0.9);
			text.setText(args[1]);
			text.setTextColor(android.graphics.Color.WHITE)
			text.setBackgroundDrawable(new android.graphics.drawable.GradientDrawable(android.graphics.drawable.GradientDrawable.Orientation.LEFT_RIGHT , [android.graphics.Color.rgb(0, 127, 0), android.graphics.Color.rgb(63, 95, 0), android.graphics.Color.rgb(0, 63, 0)]));
			text.setPadding(padding, 0, padding, 0);
			return text;
		},
		keyValue : function (args) {
			var layoutElement = new android.widget.RelativeLayout(context),
				text = new android.widget.TextView(context),
				textLp = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT),
				textValue = new android.widget.TextView(context),
				textValueLp = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
			text.setTextSize(textSize);
			text.setText(android.text.Html.fromHtml(args[2]));
			text.setMovementMethod(android.text.method.LinkMovementMethod.getInstance());
			textValue.setTextSize(textSize);
			textValue.setTextColor(android.graphics.Color.rgb(100, 255, 0));
			textValue.setId(1);
			switch (args[1]) {
			case "multipleChoice":
				if (args[4].length <= settings[args[3]]) {settings[args[3]] = 0}
				textValue.setText(args[4][settings[args[3]]]);
				textValue.setOnClickListener(function(v){
					var alert = new android.app.AlertDialog.Builder(context),
						listView = new android.widget.ListView(context),
						adapter = new android.widget.ArrayAdapter(context, android.R.layout.simple_list_item_single_choice, args[4]);
					listView.setAdapter(adapter);
					listView.setChoiceMode(android.widget.ListView.CHOICE_MODE_SINGLE);
					listView.setItemChecked(settings[args[3]], true);
					listView.setDivider(new android.graphics.drawable.GradientDrawable(android.graphics.drawable.GradientDrawable.Orientation.LEFT_RIGHT, [android.graphics.Color.GREEN, android.graphics.Color.YELLOW, android.graphics.Color.GREEN]));
					listView.setDividerHeight(2);
					listView.setPadding(padding, padding, padding, padding);
					listView.setOnItemClickListener(function(parent, view, position, id) {
						settings[args[3]] = position;
						for (var i = 5; i < args.length; i += 2) {settings[args[i]] = args[i + 1][position]; }
						textValue.setText(args[4][position]);
						settingsChanged(args[3]);
						alert.dismiss();
					});
					alert.setView(listView);
					alert.setTitle(args[2]);
					alert.setNegativeButton("Cancel", function(dialog, whichButton) {
						alert.dismiss();
					});
					alert = alert.show();
				});
				break;
			case "slider":
				textValue.setText(settings[args[3]] + args[7]);
				textValue.setOnClickListener(function(v){
					var alert = new android.app.AlertDialog.Builder(context),
						seekBar = new android.widget.SeekBar(context);
					seekBar.setMax((args[5] - args[4]) / args[6]);
					seekBar.setProgress((settings[args[3]] - args[4]) / args[6]);
					seekBar.setOnSeekBarChangeListener(new android.widget.SeekBar.OnSeekBarChangeListener({
						onProgressChanged: function(seekBar, progress, fromUser) {
							alert.setTitle(args[2] + "  " + (progress * args[6] + args[4]) + args[7]);
						}
					}));
					alert.setView(seekBar);
					alert.setTitle(args[2] + "  " + settings[args[3]] + args[7]);
					alert.setPositiveButton("Ok", function(dialog, whichButton) {
						settings[args[3]] = seekBar.getProgress() * args[6] + args[4];
						textValue.setText(settings[args[3]] + args[7]);
						settingsChanged(args[3]);
						alert.dismiss();
					});
					alert.setNegativeButton("Cancel", function(dialog, whichButton) {
						alert.dismiss();
					});
					alert = alert.show();
				});
				break;
			default:
				textValue.setText(String(args[3]));
			}
			textLp.addRule(android.widget.RelativeLayout.ALIGN_PARENT_LEFT);
			textLp.addRule(android.widget.RelativeLayout.CENTER_VERTICAL);
			textLp.addRule(android.widget.RelativeLayout.LEFT_OF, 1);
			textValueLp.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
			textValueLp.addRule(android.widget.RelativeLayout.CENTER_VERTICAL);
			layoutElement.addView(textValue, textValueLp);
			layoutElement.addView(text, textLp);
			layoutElement.setPadding(padding, padding, padding, padding);
			return layoutElement;
		}};
	padding = padding * context.getResources().getDisplayMetrics().density;
	layout.setOrientation(android.widget.LinearLayout.VERTICAL);
	layout.setPadding(padding, 0, padding, 0);
	for (i = 2; i < len; i += 1) {
		layout.addView(addOption[arguments[0][i][0]](arguments[0][i]));
		if (i + 1 < len) {
			ruler = new android.view.View(context);
			ruler.setBackgroundDrawable(new android.graphics.drawable.GradientDrawable(android.graphics.drawable.GradientDrawable.Orientation.LEFT_RIGHT, [android.graphics.Color.GREEN, android.graphics.Color.YELLOW, android.graphics.Color.GREEN]));
			layout.addView(ruler, rulerLp);
		}
	}
	scroll.addView(layout);
	alert.setView(scroll);
	alert.setTitle(arguments[0][0]);
	alert.setPositiveButton(arguments[0][1], function(dialog,whichButton){
		settingsClosed();
	});
	return alert;
}
function save(path, filename, content) {
	try {
		java.io.File(path).mkdirs();
		var newFile = new java.io.File(path, filename);
		newFile.createNewFile();
		var outWrite = new java.io.OutputStreamWriter(new java.io.FileOutputStream(newFile));
		outWrite.append(content);
		outWrite.close();
	} catch (e) {
		print("save, " + e + " (" + e.fileName + " #" + e.lineNumber + ")");
	}
}
function load(path, filename) {
	var content = "";
	if (java.io.File(path + filename).exists()) {
		var file = new java.io.File(path + filename),
			fos = new java.io.FileInputStream(file),
			str = new java.lang.StringBuilder(),
			ch;
		while ((ch = fos.read()) != -1) {str.append(java.lang.Character(ch)); }
		content = String(str.toString());
		fos.close();
	}
	return content;
}
function loadTxtFromUrl(url) {
	try {
		var content = new java.io.ByteArrayOutputStream();
		android.net.http.AndroidHttpClient.newInstance("userAgent").execute(new org.apache.http.client.methods.HttpGet(url)).getEntity().writeTo(content);
		content.close();
		return String(content.toString());
	} catch (e) {
		return "";
	}
}