//Dark Mode native: remove /* and */ to activate

//Dark Mode style 1
/*
user_pref("browser.active_color", "blue");
user_pref("browser.display.background_color", "#3f3f3f");
user_pref("browser.display.foreground_color", "#ffffff");
user_pref("browser.anchor_color", "#ffcc99");
user_pref("browser.visited_color", "#cc99ff");
user_pref("browser.display.document_color_use", 2);
user_pref("browser.display.use_system_colors", false);
user_pref("layout.css.forced-colors.enabled", false);
*/

//Dark Mode style 2
/*
user_pref("browser.active_color", "blue");
user_pref("browser.display.background_color", "#121212");
user_pref("browser.display.foreground_color", "#ffffff");
user_pref("browser.anchor_color", "#ffcc99");
user_pref("browser.visited_color", "#cc99ff");
user_pref("browser.display.document_color_use", 2);
user_pref("browser.display.use_system_colors", false);
user_pref("layout.css.forced-colors.enabled", false);
*/

//Dark Mode style Dark Reader
/*
user_pref("browser.active_color", "blue");
user_pref("browser.display.background_color", "#232627");
user_pref("browser.display.foreground_color", "#E4E3DF");
user_pref("browser.anchor_color", "#92BBDE");
user_pref("browser.visited_color", "#ED944F");
user_pref("browser.display.document_color_use", 2);
user_pref("browser.display.use_system_colors", false);
user_pref("layout.css.forced-colors.enabled", false);
*/

//Gray Mode
/*
user_pref("browser.active_color", "blue");
user_pref("browser.display.background_color", "#cccccc");
user_pref("browser.display.foreground_color", "#000000");
user_pref("browser.anchor_color", "#800040");
user_pref("browser.visited_color", "#b93d00");
user_pref("browser.display.document_color_use", 2);
user_pref("browser.display.use_system_colors", false);
user_pref("layout.css.forced-colors.enabled", false);
*/

//Dark Brown Mode
/*
user_pref("browser.active_color", "blue");
user_pref("browser.display.background_color", "#3f3f3f");
user_pref("browser.display.foreground_color", "#c9c9bb");
user_pref("browser.anchor_color", "#dca3a3");
user_pref("browser.visited_color", "#bba66f");
user_pref("browser.display.document_color_use", 2);
user_pref("browser.display.use_system_colors", false);
user_pref("layout.css.forced-colors.enabled", false);
*/

//Tweaks
//Instant start-up
user_pref("browser.startup.preXulSkeletonUI", false);

//Snappier tooltips
user_pref("ui.tooltip.delay_ms", 60);
user_pref("ui.tooltipDelay", 60);
user_pref("ui.submenuDelay", 0);
user_pref("browser.overlink-delay", 10);

//Enable Alt-Tab-like switch, Ctrl+Tab
user_pref("browser.ctrlTab.sortByRecentlyUsed", true);

//Enable userChrome.css
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);

// Reduce disk read/write
user_pref("browser.sessionstore.idleDelay", 180);
user_pref("browser.sessionstore.interval", 3600000);
//user_pref("browser.sessionstore.collect_zoom", false);
//user_pref("browser.sessionstore.privacy_level", 2);
user_pref("browser.sessionstore.restore_pinned_tabs_on_demand", true);
//user_pref("browser.sessionhistory.max_total_viewers", 0);

// Disable Pocket and Accessibility
user_pref("extensions.pocket.enabled", false);
user_pref("accessibility.force_disabled", 1);

// Disable Taskbar Preview
user_pref("browser.taskbar.lists.enabled", false);
user_pref("browser.taskbar.lists.frequent.enabled", false);
user_pref("browser.taskbar.lists.maxListItemCount", 0);
//user_pref("browser.taskbar.lists.refreshInSeconds", 2147483647);
user_pref("browser.taskbar.lists.tasks.enabled", false);
user_pref("browser.taskbar.previews.max", 0);

// Optimize rendering speed
// https://voz.vn/t/tong-hop-nhung-addon-chat-cho-firefox-pc-mobile.682181/post-23570551
// https://voz.vn/t/tong-hop-nhung-addon-chat-cho-firefox-pc-mobile.682181/post-27064564
user_pref("nglayout.initialpaint.delay", 2000);
user_pref("nglayout.initialpaint.delay_in_oopif", 2000);
user_pref("content.notify.backoffcount", 0);
user_pref("content.notify.interval", 2000000);
user_pref("content.notify.ontimer", true);

// Enable punycode
// https://voz.vn/t/tong-hop-nhung-addon-chat-cho-firefox-pc-mobile.682181/post-25938099
user_pref("network.IDN_show_punycode", true);

// Prefer no animation
// https://voz.vn/p/33057189/
user_pref("ui.prefersReducedMotion", 1);

// Maximize bandwidth
// https://voz.vn/p/33049233/
user_pref("network.http.http3.cc_algorithm", 0);

// Tweak bytecode
// https://voz.vn/p/32603773/
user_pref("browser.cache.jsbc_compression_level", 2);
user_pref("dom.script_loader.bytecode_cache.strategy", -1);
//user_pref("javascript.options.mem.gc_balanced_heap_limits", true);

// Enable old clear history dialog
user_pref("privacy.sanitize.useOldClearHistoryDialog", true);

// Disable IPv6
//user_pref("network.dns.disableIPv6", true);

// GoogleDNS
// https://voz.vn/t/tong-hop-nhung-addon-chat-cho-firefox-pc-mobile.682181/post-24688026
//user_pref("network.trr.uri", "https://dns.nextdns.io/");
//user_pref("network.trr.custom_uri", "https://dns.nextdns.io/");
//user_pref("network.trr.mode", 2);

// Enable ECS
//user_pref("network.trr.disable-ECS", false);

// Enable Kyber to access blocked websites
user_pref("security.tls.enable_kyber", true);

// Reduce network request
// https://voz.vn/t/tong-hop-nhung-addon-chat-cho-firefox-pc-mobile.682181/post-27409530
user_pref("network.http.rcwn.enabled", false);

// Fix Facebook time (ESR <= 115)
user_pref("dom.textMetrics.fontBoundingBox.enabled", true);

// PREF: disable EcoQoS [WINDOWS] 
// Background tab processes use efficiency mode on Windows 11 to limit resource use. 
// [WARNING] Leave this alone, unless you're on Desktop and you rely on 
// background tabs to have maximum performance. 
// [1] https://devblogs.microsoft.com/performance-diagnostics/introducing-ecoqos/ 
// [2] https://bugzilla.mozilla.org/show_bug.cgi?id=1796525 
// [3] https://bugzilla.mozilla.org/show_bug.cgi?id=1800412 
// [4] https://reddit.com/r/firefox/comments/107fj69/how_can_i_disable_the_efficiency_mode_on_firefox/ 
user_pref("dom.ipc.processPriorityManager.backgroundUsesEcoQoS", false); 

// Enable Add Search
user_pref("browser.urlbar.update2.engineAliasRefresh", true);

// Enable Sleeping Tab
user_pref("floorp.tabsleep.enabled", true);
user_pref("floorp.tabsleep.tabTimeoutMinutes", 6);

// Enable PWA
user_pref("browser.ssb.enabled", true);

// Force RAM cache, uncomment // to enable
// https://voz.vn/t/cach-ep-firefox-luu-cache-tren-ram-ma-khong-can-ramdisk.664955/
//user_pref("browser.cache.disk.enable", false);
//user_pref("browser.cache.memory.enable", true);
//user_pref("browser.cache.memory.capacity", 524288);
//user_pref("browser.cache.memory.max_entry_size", 512000);

// Disable FastBack to save RAM
//user_pref("fission.bfcacheInParent", false);
//user_pref("fission.disableSessionHistoryInParent", true);
//user_pref("browser.sessionhistory.max_total_viewers", 0);

// Enable Multi-Account Container
user_pref("privacy.userContext.enabled", true); //enable Multi-Account Container
user_pref("privacy.userContext.ui.enabled", true); //enable Multi-Account Container

// Enable Cookie Banner Protection
//user_pref("cookiebanners.service.mode", 2);
//user_pref("cookiebanners.service.mode.privateBrowsing", 2);

// Disable Restricted Domains
user_pref("extensions.webextensions.restrictedDomains", "");

// No Animation Fullscreen
user_pref("browser.fullscreen.animate", true);
user_pref("full-screen-api.transition-duration.enter", "0 0");
user_pref("full-screen-api.transition-duration.leave", "0 0");

/****************************************************************************
 * Betterfox                                                                *
 * "Ad meliora"                                                             *
 * version: 128                                                             *
 * url: https://github.com/yokoffing/Betterfox                              *
****************************************************************************/

/****************************************************************************
 * SECTION: FASTFOX                                                         *
****************************************************************************/
/** GENERAL ***/
user_pref("content.notify.interval", 100000);

/** GFX ***/
user_pref("gfx.canvas.accelerated.cache-items", 4096);
user_pref("gfx.canvas.accelerated.cache-size", 512);
user_pref("gfx.content.skia-font-cache-size", 20);

/** DISK CACHE ***/
user_pref("browser.cache.jsbc_compression_level", 3);

/** MEDIA CACHE ***/
user_pref("media.memory_cache_max_size", 65536);
user_pref("media.cache_readahead_limit", 7200);
user_pref("media.cache_resume_threshold", 3600);

/** IMAGE CACHE ***/
user_pref("image.mem.decode_bytes_at_a_time", 32768);

/** NETWORK ***/
user_pref("network.http.max-connections", 1800);
user_pref("network.http.max-persistent-connections-per-server", 10);
user_pref("network.http.max-urgent-start-excessive-connections-per-host", 5);
user_pref("network.http.pacing.requests.enabled", false);
user_pref("network.dnsCacheExpiration", 3600);
user_pref("network.ssl_tokens_cache_capacity", 10240);

/** SPECULATIVE LOADING ***/
user_pref("network.dns.disablePrefetch", true);
user_pref("network.dns.disablePrefetchFromHTTPS", true);
user_pref("network.prefetch-next", false);
user_pref("network.predictor.enabled", false);
user_pref("network.predictor.enable-prefetch", false);

/** EXPERIMENTAL ***/
user_pref("layout.css.grid-template-masonry-value.enabled", true);
user_pref("dom.enable_web_task_scheduling", true);
user_pref("dom.security.sanitizer.enabled", true);

/** TELEMETRY ***/
user_pref("datareporting.policy.dataSubmissionEnabled", false);
user_pref("datareporting.healthreport.uploadEnabled", false);
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.enabled", false);
user_pref("toolkit.telemetry.server", "data:,");
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("toolkit.telemetry.newProfilePing.enabled", false);
user_pref("toolkit.telemetry.shutdownPingSender.enabled", false);
user_pref("toolkit.telemetry.updatePing.enabled", false);
user_pref("toolkit.telemetry.bhrPing.enabled", false);
user_pref("toolkit.telemetry.firstShutdownPing.enabled", false);
user_pref("toolkit.telemetry.coverage.opt-out", true);
user_pref("toolkit.coverage.opt-out", true);
user_pref("toolkit.coverage.endpoint.base", "");
user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
user_pref("browser.newtabpage.activity-stream.telemetry", false);

/** EXPERIMENTS ***/
user_pref("app.shield.optoutstudies.enabled", false);
user_pref("app.normandy.enabled", false);
user_pref("app.normandy.api_url", "");

/** CRASH REPORTS ***/
user_pref("breakpad.reportURL", "");
user_pref("browser.tabs.crashReporting.sendReport", false);
user_pref("browser.crashReports.unsubmittedCheck.autoSubmit2", false);

/** DETECTION ***/
user_pref("captivedetect.canonicalURL", "");
user_pref("network.captive-portal-service.enabled", false);
user_pref("network.connectivity-service.enabled", false);
user_pref("dom.private-attribution.submission.enabled", false);

/****************************************************************************
 * SECTION: PESKYFOX                                                        *
****************************************************************************/
/** MOZILLA UI ***/
user_pref("browser.privatebrowsing.vpnpromourl", "");
user_pref("extensions.getAddons.showPane", false);
user_pref("extensions.htmlaboutaddons.recommendations.enabled", false);
user_pref("browser.discovery.enabled", false);
user_pref("browser.shell.checkDefaultBrowser", false);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons", false);
user_pref("browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features", false);
user_pref("browser.preferences.moreFromMozilla", false);
user_pref("browser.tabs.tabmanager.enabled", false);
user_pref("browser.aboutConfig.showWarning", false);
user_pref("browser.aboutwelcome.enabled", false);

/** THEME ADJUSTMENTS ***/
user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);
user_pref("browser.compactmode.show", true);
user_pref("browser.display.focus_ring_on_anything", true);
user_pref("browser.display.focus_ring_style", 0);
user_pref("browser.display.focus_ring_width", 0);
user_pref("layout.css.prefers-color-scheme.content-override", 2);
user_pref("browser.privateWindowSeparation.enabled", false); // WINDOWS

/** FULLSCREEN NOTICE ***/
user_pref("full-screen-api.transition-duration.enter", "0 0");
user_pref("full-screen-api.transition-duration.leave", "0 0");
user_pref("full-screen-api.warning.delay", -1);
user_pref("full-screen-api.warning.timeout", 0);

/** URL BAR ***/
user_pref("browser.urlbar.suggest.calculator", true);
user_pref("browser.urlbar.unitConversion.enabled", true);
user_pref("browser.urlbar.trending.featureGate", false);

/** NEW TAB PAGE ***/
user_pref("browser.newtabpage.activity-stream.feeds.topsites", false);
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);

/** POCKET ***/
user_pref("extensions.pocket.enabled", false);

/** PDF ***/
user_pref("browser.download.open_pdf_attachments_inline", true);

/** TAB BEHAVIOR ***/
user_pref("browser.bookmarks.openInTabClosesMenu", false);
user_pref("browser.menu.showViewImageInfo", true);
user_pref("findbar.highlightAll", true);
user_pref("layout.word_select.eat_space_to_next_word", false);

/****************************************************************************
 * START: MY OVERRIDES                                                      *
****************************************************************************/
// visit https://github.com/yokoffing/Betterfox/wiki/Common-Overrides
// visit https://github.com/yokoffing/Betterfox/wiki/Optional-Hardening
// Enter your personal overrides below this line:

/****************************************************************************
 * SECTION: SMOOTHFOX                                                       *
****************************************************************************/
// visit https://github.com/yokoffing/Betterfox/blob/main/Smoothfox.js
// Enter your scrolling overrides below this line:

/****************************************************************************
 * END: BETTERFOX                                                           *
****************************************************************************/
