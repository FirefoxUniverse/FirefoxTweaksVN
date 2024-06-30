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

/****************************************************************************
 * SECTION: NETWORK                                                         *
****************************************************************************/

// PREF: use bigger packets
// Reduce Firefox's CPU usage by requiring fewer application-to-driver data transfers.
// However, it does not affect the actual packet sizes transmitted over the network.
// [1] https://www.mail-archive.com/support-seamonkey@lists.mozilla.org/msg74561.html
user_pref("network.buffer.cache.size", 262144); // 256 kb; default=32768 (32 kb)
user_pref("network.buffer.cache.count", 128); // default=24

// PREF: increase TLS token caching 
user_pref("network.ssl_tokens_cache_capacity", 10240); // default=2048; more TLS token caching (fast reconnects)

/** GFX ***/
//user_pref("gfx.canvas.accelerated", true); // enable if using a dedicated GPU on WINDOWS
user_pref("gfx.canvas.accelerated.cache-items", 4096);
user_pref("gfx.canvas.accelerated.cache-size", 512);
user_pref("gfx.content.skia-font-cache-size", 20);

/** MEDIA CACHE ***/
user_pref("media.memory_cache_max_size", 65536);
user_pref("media.cache_readahead_limit", 7200);
user_pref("media.cache_resume_threshold", 3600);

/** IMAGE CACHE ***/
user_pref("image.mem.decode_bytes_at_a_time", 32768);

//Tweaks
//Instant start-up
user_pref("browser.startup.preXulSkeletonUI", false);

//Snappier tooltips
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
user_pref("cookiebanners.service.mode", 2);
user_pref("cookiebanners.service.mode.privateBrowsing", 2);

// Disable Restricted Domains
user_pref("extensions.webextensions.restrictedDomains", "");

// No Animation Fullscreen
user_pref("browser.fullscreen.animate", true);
user_pref("full-screen-api.transition-duration.enter", "0 0");
user_pref("full-screen-api.transition-duration.leave", "0 0");

/*** [SECTION 0300]: QUIETER FOX ***/
user_pref("_user.js.parrot", "0300 syntax error: the parrot's not pinin' for the fjords!");
/** RECOMMENDATIONS ***/
/* 0320: disable recommendation pane in about:addons (uses Google Analytics) ***/
user_pref("extensions.getAddons.showPane", false); // [HIDDEN PREF]
/* 0321: disable recommendations in about:addons' Extensions and Themes panes [FF68+] ***/
user_pref("extensions.htmlaboutaddons.recommendations.enabled", false);
/* 0322: disable personalized Extension Recommendations in about:addons and AMO [FF65+]
 * [NOTE] This pref has no effect when Health Reports (0331) are disabled
 * [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to make personalized extension recommendations
 * [1] https://support.mozilla.org/kb/personalized-extension-recommendations ***/
user_pref("browser.discovery.enabled", false);
/* 0323: disable shopping experience [FF116+]
 * [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1840156#c0 ***/
user_pref("browser.shopping.experience2023.enabled", false); // [DEFAULT: false]

/** TELEMETRY ***/
/* 0330: disable new data submission [FF41+]
 * If disabled, no policy is shown or upload takes place, ever
 * [1] https://bugzilla.mozilla.org/1195552 ***/
user_pref("datareporting.policy.dataSubmissionEnabled", false);
/* 0331: disable Health Reports
 * [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to send technical... data ***/
user_pref("datareporting.healthreport.uploadEnabled", false);
/* 0332: disable telemetry
 * The "unified" pref affects the behavior of the "enabled" pref
 * - If "unified" is false then "enabled" controls the telemetry module
 * - If "unified" is true then "enabled" only controls whether to record extended data
 * [NOTE] "toolkit.telemetry.enabled" is now LOCKED to reflect prerelease (true) or release builds (false) [2]
 * [1] https://firefox-source-docs.mozilla.org/toolkit/components/telemetry/telemetry/internals/preferences.html
 * [2] https://medium.com/georg-fritzsche/data-preference-changes-in-firefox-58-2d5df9c428b5 ***/
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.enabled", false); // see [NOTE]
user_pref("toolkit.telemetry.server", "data:,");
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("toolkit.telemetry.newProfilePing.enabled", false); // [FF55+]
user_pref("toolkit.telemetry.shutdownPingSender.enabled", false); // [FF55+]
user_pref("toolkit.telemetry.updatePing.enabled", false); // [FF56+]
user_pref("toolkit.telemetry.bhrPing.enabled", false); // [FF57+] Background Hang Reporter
user_pref("toolkit.telemetry.firstShutdownPing.enabled", false); // [FF57+]
/* 0333: disable Telemetry Coverage
 * [1] https://blog.mozilla.org/data/2018/08/20/effectively-measuring-search-in-firefox/ ***/
user_pref("toolkit.telemetry.coverage.opt-out", true); // [HIDDEN PREF]
user_pref("toolkit.coverage.opt-out", true); // [FF64+] [HIDDEN PREF]
user_pref("toolkit.coverage.endpoint.base", "");
/* 0334: disable PingCentre telemetry (used in several System Add-ons) [FF57+]
 * Defense-in-depth: currently covered by 0331 ***/
user_pref("browser.ping-centre.telemetry", false);
/* 0335: disable Firefox Home (Activity Stream) telemetry ***/
user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
user_pref("browser.newtabpage.activity-stream.telemetry", false);

/** STUDIES ***/
/* 0340: disable Studies
 * [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to install and run studies ***/
user_pref("app.shield.optoutstudies.enabled", false);
/* 0341: disable Normandy/Shield [FF60+]
 * Shield is a telemetry system that can push and test "recipes"
 * [1] https://mozilla.github.io/normandy/ ***/
user_pref("app.normandy.enabled", false);
user_pref("app.normandy.api_url", "");

/** CRASH REPORTS ***/
/* 0350: disable Crash Reports ***/
user_pref("breakpad.reportURL", "");
user_pref("browser.tabs.crashReporting.sendReport", false); // [FF44+]
   // user_pref("browser.crashReports.unsubmittedCheck.enabled", false); // [FF51+] [DEFAULT: false]
/* 0351: enforce no submission of backlogged Crash Reports [FF58+]
 * [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to send backlogged crash reports  ***/
user_pref("browser.crashReports.unsubmittedCheck.autoSubmit2", false); // [DEFAULT: false]

/** OTHER ***/
/* 0360: disable Captive Portal detection
 * [1] https://www.eff.org/deeplinks/2017/08/how-captive-portals-interfere-wireless-security-and-privacy ***/
user_pref("captivedetect.canonicalURL", "");
user_pref("network.captive-portal-service.enabled", false); // [FF52+]
/* 0361: disable Network Connectivity checks [FF65+]
 * [1] https://bugzilla.mozilla.org/1460537 ***/
user_pref("network.connectivity-service.enabled", false);

/*** [SECTION 0400]: SAFE BROWSING (SB)
   SB has taken many steps to preserve privacy. If required, a full url is never sent
   to Google, only a part-hash of the prefix, hidden with noise of other real part-hashes.
   Firefox takes measures such as stripping out identifying parameters and since SBv4 (FF57+)
   doesn't even use cookies. (#Turn on browser.safebrowsing.debug to monitor this activity)

   [1] https://feeding.cloud.geek.nz/posts/how-safe-browsing-works-in-firefox/
   [2] https://wiki.mozilla.org/Security/Safe_Browsing
   [3] https://support.mozilla.org/kb/how-does-phishing-and-malware-protection-work
   [4] https://educatedguesswork.org/posts/safe-browsing-privacy/
***/
user_pref("_user.js.parrot", "0400 syntax error: the parrot's passed on!");
/* 0401: disable SB (Safe Browsing)
 * [WARNING] Do this at your own risk! These are the master switches
 * [SETTING] Privacy & Security>Security>... Block dangerous and deceptive content ***/
   // user_pref("browser.safebrowsing.malware.enabled", false);
   // user_pref("browser.safebrowsing.phishing.enabled", false);
/* 0402: disable SB checks for downloads (both local lookups + remote)
 * This is the master switch for the safebrowsing.downloads* prefs (0403, 0404)
 * [SETTING] Privacy & Security>Security>... "Block dangerous downloads" ***/
   // user_pref("browser.safebrowsing.downloads.enabled", false);
/* 0403: disable SB checks for downloads (remote)
 * To verify the safety of certain executable files, Firefox may submit some information about the
 * file, including the name, origin, size and a cryptographic hash of the contents, to the Google
 * Safe Browsing service which helps Firefox determine whether or not the file should be blocked
 * [SETUP-SECURITY] If you do not understand this, or you want this protection, then override this ***/
user_pref("browser.safebrowsing.downloads.remote.enabled", false);
   // user_pref("browser.safebrowsing.downloads.remote.url", ""); // Defense-in-depth
/* 0404: disable SB checks for unwanted software
 * [SETTING] Privacy & Security>Security>... "Warn you about unwanted and uncommon software" ***/
   // user_pref("browser.safebrowsing.downloads.remote.block_potentially_unwanted", false);
   // user_pref("browser.safebrowsing.downloads.remote.block_uncommon", false);
/* 0405: disable "ignore this warning" on SB warnings [FF45+]
 * If clicked, it bypasses the block for that session. This is a means for admins to enforce SB
 * [TEST] see https://github.com/arkenfox/user.js/wiki/Appendix-A-Test-Sites#-mozilla
 * [1] https://bugzilla.mozilla.org/1226490 ***/
   // user_pref("browser.safebrowsing.allowOverride", false);
