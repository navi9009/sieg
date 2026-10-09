import type { Landmark } from "./GermanyHero";
import brandenburgAsset from "@/assets/germany/brandenburg.jpg.asset.json";
import neuschwansteinAsset from "@/assets/germany/neuschwanstein.jpg.asset.json";
import cologneAsset from "@/assets/germany/cologne.jpg.asset.json";
import heidelbergAsset from "@/assets/germany/heidelberg.jpg.asset.json";
import reichstagAsset from "@/assets/germany/reichstag.jpg.asset.json";
import hamburgAsset from "@/assets/germany/hamburg.jpg.asset.json";
import munichAsset from "@/assets/germany/munich.jpg.asset.json";
import rhineAsset from "@/assets/germany/rhine.jpg.asset.json";

export const germanyLandmarks: Landmark[] = [
  { ...{"name": "Brandenburg Gate", "location": "Berlin", "author": "Thomas Wolf", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Brandenburger_Tor_abends.jpg"}, url: brandenburgAsset.url },
  { ...{"name": "Neuschwanstein Castle", "location": "Bavaria", "author": "Llez", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Neuschwanstein_Castle_07.jpg"}, url: neuschwansteinAsset.url },
  { ...{"name": "Cologne Cathedral", "location": "Cologne", "author": "Velvet", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Cologne_cathedrale_vue_sud.jpg"}, url: cologneAsset.url },
  { ...{"name": "Heidelberg Castle & Old Town", "location": "Heidelberg", "author": "Schlurcher", "license": "CC BY 4.0", "licenseUrl": "https://creativecommons.org/licenses/by/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Heidelberg_Altstadt_Schloss_Luftbild.JPG"}, url: heidelbergAsset.url },
  { ...{"name": "Reichstag Building", "location": "Berlin", "author": "Jörg Braukmann", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Reichstagsgeb%C3%A4ude_von_Westen.jpg"}, url: reichstagAsset.url },
  { ...{"name": "Speicherstadt Waterfront", "location": "Hamburg", "author": "Dietmar Rabich", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Hamburg%2C_Speicherstadt%2C_Wasserschloss_--_2016_--_3272-8.jpg"}, url: hamburgAsset.url },
  { ...{"name": "Marienplatz", "location": "Munich", "author": "Pierre André", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Munich_Marienplatz_et_Mariens%C3%A4ule.JPG"}, url: munichAsset.url },
  { ...{"name": "Rhine Valley & Castles", "location": "Rhine Valley", "author": "Kassandrum", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0/", "source": "https://commons.wikimedia.org/wiki/File:Burg_Pfalzgrafenstein_bei_Kaub_%28Pfalz_bei_Kaub%29_full.jpg"}, url: rhineAsset.url }
];
