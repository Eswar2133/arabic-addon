const addonBuilder = require("stremio-addon-sdk").addonBuilder;

const builder = addonBuilder({
  id: "org.arabic.sdk",
  version: "1.0.0",
  name: "Arabic Classics SDK",
  description: "Streaming Arabic classic movies via SDK.",
  logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/Internet_Archive_logo_and_wordmark.svg",
  resources: ["catalog", "stream"],
  types: ["movie"],
  catalogs: [{ type: "movie", id: "arabic", name: "Arabic Classics" }]
});

const MOVIES = [
  {
    id: "arabic-movie-1",
    type: "movie",
    name: "الناصر صلاح الدين (1963)",
    poster: "https://ia801600.us.archive.org/22/items/Nasser-Salah-El-Din/Nasser-Salah-El-Din.jpg",
    description: "فيلم مصري تاريخي من إخراج يوسف شاهين."
  }
];

builder.defineCatalogHandler(({ type, id, extra }, cb) => {
  cb(null, { metas: MOVIES });
});

builder.defineStreamHandler(({ id }, cb) => {
  if (id === "arabic-movie-1") {
    cb(null, {
      streams: [
        {
          title: "Watch HD",
          url: "https://archive.org/download/Nasser-Salah-El-Din/Nasser-Salah-El-Din.mp4"
        }
      ]
    });
  } else {
    cb(null, { streams: [] });
  }
});

module.exports = builder.getInterface();
