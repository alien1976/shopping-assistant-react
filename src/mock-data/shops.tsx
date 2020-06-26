// //@ts-ignore
// import ballaImageUrl from '../assets/images/balla.png';
// //@ts-ignore
// import KaauflandImageUrl from '../assets/images/kaaufland.png';
// //@ts-ignore
// import ShopMap from '../assets/images/shopMap.svg';
// import { IProduct, IShop } from '../globals/interfaces';

// const MOCK_MAP = { "429.75,470": [{ "coord": "442.75,390", "weight": 81.04936767180853 }, { "coord": "365.75,446", "weight": 68.35202996254024 }, { "coord": "364.75,391", "weight": 102.30347012687302 }, { "coord": "380.75,390", "weight": 93.81364506296512 }], "317.75,391": [{ "coord": "342.75,391", "weight": 25 }, { "coord": "318.75,444", "weight": 53.009433122794285 }, { "coord": "294.75,391", "weight": 23 }, { "coord": "308.75,375", "weight": 18.35755975068582 }, { "coord": "342.75,374", "weight": 30.23243291566195 }], "294.75,391": [{ "coord": "294.75,444", "weight": 53 }, { "coord": "317.75,391", "weight": 23 }, { "coord": "271.75,391", "weight": 23 }, { "coord": "275.75,376", "weight": 24.20743687382041 }, { "coord": "308.75,375", "weight": 21.2602916254693 }], "294.75,444": [{ "coord": "271.75,444", "weight": 23 }, { "coord": "318.75,444", "weight": 24 }, { "coord": "294.75,391", "weight": 53 }], "247.75,391": [{ "coord": "271.75,391", "weight": 24 }, { "coord": "224.75,391", "weight": 23 }, { "coord": "247.75,445", "weight": 54 }, { "coord": "242.75,375", "weight": 16.76305461424021 }], "224.75,391": [{ "coord": "247.75,391", "weight": 23.021728866442675 }, { "coord": "200.75,391", "weight": 24 }, { "coord": "224.75,445", "weight": 54 }, { "coord": "207.75,378", "weight": 21.400934559032695 }, { "coord": "242.75,375", "weight": 24.08318915758459 }], "201.75,445": [{ "coord": "224.75,445", "weight": 23 }, { "coord": "200.75,391", "weight": 54.00925846556311 }, { "coord": "163,420.5714340209961", "weight": 45.80739389869879 }, { "coord": "140,451.5714340209961", "weight": 62.098681508485384 }], "200.75,391": [{ "coord": "224.75,391", "weight": 23.08679276123039 }, { "coord": "201.75,445", "weight": 54.037024344425184 }, { "coord": "174.75,383", "weight": 27.202941017470888 }, { "coord": "207.75,378", "weight": 14.7648230602334 }, { "coord": "163,420.5714340209961", "weight": 47.953437937838466 }], "224.75,445": [{ "coord": "201.75,445", "weight": 21.095023109728988 }, { "coord": "247.75,445", "weight": 23 }, { "coord": "224.75,391", "weight": 52.03844732503075 }], "247.75,445": [{ "coord": "224.75,445", "weight": 25.019992006393608 }, { "coord": "271.75,444", "weight": 24.020824298928627 }, { "coord": "247.75,391", "weight": 53.03772242470448 }], "271.75,444": [{ "coord": "247.75,445", "weight": 23.021728866442675 }, { "coord": "294.75,444", "weight": 24 }, { "coord": "271.75,391", "weight": 53 }], "271.75,391": [{ "coord": "294.75,391", "weight": 23.194827009486403 }, { "coord": "247.75,391", "weight": 23 }, { "coord": "271.75,444", "weight": 53.009433122794285 }, { "coord": "275.75,376", "weight": 15.524174696260024 }, { "coord": "242.75,375", "weight": 33.12099032335839 }], "318.75,444": [{ "coord": "294.75,444", "weight": 22 }, { "coord": "342.75,445", "weight": 24.020824298928627 }, { "coord": "317.75,391", "weight": 53.009433122794285 }], "342.75,391": [{ "coord": "342.75,445", "weight": 54 }, { "coord": "364.75,391", "weight": 22 }, { "coord": "317.75,391", "weight": 25.079872407968907 }, { "coord": "342.75,374", "weight": 17 }], "342.75,445": [{ "coord": "342.75,391", "weight": 54.00925846556311 }, { "coord": "365.75,446", "weight": 23.021728866442675 }, { "coord": "318.75,444", "weight": 25.019992006393608 }], "365.75,446": [{ "coord": "342.75,445", "weight": 23.194827009486403 }, { "coord": "429.75,470", "weight": 67.91170738539859 }, { "coord": "364.75,391", "weight": 55.00909015790027 }, { "coord": "442.75,390", "weight": 95.2102935611481 }, { "coord": "380.75,390", "weight": 57.97413216254298 }], "364.75,391": [{ "coord": "342.75,391", "weight": 24.020824298928627 }, { "coord": "365.75,446", "weight": 56.00892785976178 }, { "coord": "429.75,470", "weight": 101.82828683622247 }, { "coord": "380.75,390", "weight": 16.0312195418814 }, { "coord": "342.75,374", "weight": 27.80287754891569 }], "380.75,390": [{ "coord": "364.75,391", "weight": 16.0312195418814 }, { "coord": "442.75,390", "weight": 62 }, { "coord": "379.75,376", "weight": 14.035668847618199 }, { "coord": "442.75,376", "weight": 63.56099432828282 }, { "coord": "429.75,470", "weight": 93.81364506296512 }, { "coord": "365.75,446", "weight": 57.97413216254298 }], "307.75,243": [{ "coord": "275.75,244", "weight": 32.01562118716424 }, { "coord": "308.75,375", "weight": 132.00378782444085 }, { "coord": "341.75,243", "weight": 34 }, { "coord": "307,97", "weight": 146.00192635715462 }], "308.75,375": [{ "coord": "294.75,391", "weight": 21.2602916254693 }, { "coord": "317.75,391", "weight": 18.35755975068582 }, { "coord": "307.75,243", "weight": 132.00378782444085 }], "275.75,376": [{ "coord": "271.75,391", "weight": 15.524174696260024 }, { "coord": "294.75,391", "weight": 24.20743687382041 }, { "coord": "275.75,244", "weight": 132 }], "174.75,383": [{ "coord": "140.75,383", "weight": 34 }, { "coord": "200.75,391", "weight": 27.202941017470888 }, { "coord": "173.75,244", "weight": 139.00359707575916 }, { "coord": "207.75,378", "weight": 33.37663853655727 }, { "coord": "163,420.5714340209961", "weight": 39.36591361055987 }], "379.75,346": [{ "coord": "379.75,309", "weight": 37 }, { "coord": "442.75,346", "weight": 63 }, { "coord": "379.75,376", "weight": 30 }], "379.75,309": [{ "coord": "379.75,346", "weight": 37 }, { "coord": "378.75,273", "weight": 36.013886210738214 }, { "coord": "441.75,309", "weight": 62 }], "441.75,309": [{ "coord": "442.75,346", "weight": 37.013511046643494 }, { "coord": "442.75,273", "weight": 36.013886210738214 }, { "coord": "379.75,309", "weight": 62 }], "442.75,273": [{ "coord": "441.75,309", "weight": 36.013886210738214 }, { "coord": "442.75,243", "weight": 30 }, { "coord": "378.75,273", "weight": 64 }], "140.75,383": [{ "coord": "174.75,383", "weight": 35.12833614050059 }, { "coord": "141,356.5714340209961", "weight": 26.429748385229903 }, { "coord": "126,405.5714340209961", "weight": 26.963533406513694 }], "207.75,378": [{ "coord": "200.75,391", "weight": 16.15549442140351 }, { "coord": "224.75,391", "weight": 23.430749027719962 }, { "coord": "206.75,244", "weight": 134.00373129133382 }, { "coord": "174.75,383", "weight": 32.7566787083184 }], "206.75,244": [{ "coord": "207.75,378", "weight": 132.00378782444085 }, { "coord": "173.75,244", "weight": 33 }, { "coord": "241.75,244", "weight": 35 }, { "coord": "206,97", "weight": 147.00191325285533 }], "139.75,244": [{ "coord": "173.75,244", "weight": 34 }, { "coord": "140,277.5714340209961", "weight": 33.57236485900411 }, { "coord": "126,260.5714340209961", "weight": 21.533112304361087 }, { "coord": "128,224", "weight": 23.19617425352724 }, { "coord": "140,202", "weight": 42.000744041028604 }], "173.75,244": [{ "coord": "139.75,244", "weight": 33 }, { "coord": "174.75,383", "weight": 138.01449199268893 }, { "coord": "206.75,244", "weight": 34.0147027033899 }, { "coord": "172,98", "weight": 146.01048763701874 }], "241.75,244": [{ "coord": "206.75,244", "weight": 33.13608305156178 }, { "coord": "242.75,375", "weight": 131.00381673829202 }, { "coord": "275.75,244", "weight": 34 }, { "coord": "240,97", "weight": 147.0104162976216 }], "242.75,375": [{ "coord": "224.75,391", "weight": 22.20360331117452 }, { "coord": "247.75,391", "weight": 13.92838827718412 }, { "coord": "241.75,244", "weight": 134.00373129133382 }, { "coord": "271.75,391", "weight": 33.12099032335839 }], "275.75,244": [{ "coord": "241.75,244", "weight": 35.014282800023196 }, { "coord": "275.75,376", "weight": 131.00381673829202 }, { "coord": "307.75,243", "weight": 31.064449134018133 }, { "coord": "274,98", "weight": 146.01048763701874 }], "341.75,243": [{ "coord": "307.75,243", "weight": 34.36568055487916 }, { "coord": "342.75,374", "weight": 131.00381673829202 }, { "coord": "378.75,243", "weight": 37 }, { "coord": "340,98", "weight": 145.0105599603008 }], "342.75,374": [{ "coord": "342.75,391", "weight": 18.027756377319946 }, { "coord": "364.75,391", "weight": 27.65863337187866 }, { "coord": "317.75,391", "weight": 31.622776601683793 }, { "coord": "341.75,243", "weight": 130.01538370516005 }], "378.75,243": [{ "coord": "341.75,243", "weight": 36.22154055254967 }, { "coord": "378.75,273", "weight": 30 }, { "coord": "442.75,243", "weight": 64 }, { "coord": "377,98", "weight": 145.0105599603008 }], "442.75,243": [{ "coord": "442.75,273", "weight": 33.015148038438355 }, { "coord": "378.75,243", "weight": 63.071388124885914 }], "378.75,273": [{ "coord": "379.75,309", "weight": 36 }, { "coord": "378.75,243", "weight": 30.01666203960727 }, { "coord": "442.75,273", "weight": 63 }], "442.75,346": [{ "coord": "379.75,346", "weight": 62.00806399170998 }, { "coord": "441.75,309", "weight": 38 }, { "coord": "442.75,376", "weight": 30 }], "442.75,390": [{ "coord": "429.75,470", "weight": 84.29116205154607 }, { "coord": "365.75,446", "weight": 98.4733466477097 }, { "coord": "380.75,390", "weight": 66 }, { "coord": "442.75,376", "weight": 14 }, { "coord": "379.75,376", "weight": 64.53681120105021 }], "379.75,376": [{ "coord": "379.75,346", "weight": 26.019223662515376 }, { "coord": "380.75,390", "weight": 18 }, { "coord": "442.75,376", "weight": 63 }, { "coord": "442.75,390", "weight": 64.53681120105021 }], "442.75,376": [{ "coord": "442.75,390", "weight": 15 }, { "coord": "442.75,346", "weight": 29 }, { "coord": "379.75,376", "weight": 63.00793600809346 }, { "coord": "380.75,390", "weight": 63.56099432828282 }], "109,416.5714340209961": [{ "coord": "82,398.5714340209961", "weight": 32.449961479175904 }, { "coord": "47,417.5714340209961", "weight": 62.00806399170998 }, { "coord": "109,451.5714340209961", "weight": 35 }, { "coord": "126,405.5714340209961", "weight": 20.248456731316587 }, { "coord": "140,451.5714340209961", "weight": 46.75467891024384 }], "125,373.5714340209961": [{ "coord": "83,372.5714340209961", "weight": 42.01190307520001 }, { "coord": "126,405.5714340209961", "weight": 32.01562118716424 }, { "coord": "141,356.5714340209961", "weight": 23.345235059857504 }, { "coord": "126,333.5714340209961", "weight": 40.01249804748511 }], "126,405.5714340209961": [{ "coord": "109,416.5714340209961", "weight": 20.248456731316587 }, { "coord": "140.75,383", "weight": 26.963533406513694 }, { "coord": "163,420.5714340209961", "weight": 39.92492955535426 }, { "coord": "125,373.5714340209961", "weight": 32.01562118716424 }], "126,333.5714340209961": [{ "coord": "125,373.5714340209961", "weight": 40.01249804748511 }, { "coord": "140,318.5714340209961", "weight": 20.518284528683193 }, { "coord": "125,299.5714340209961", "weight": 34.0147027033899 }, { "coord": "141,356.5714340209961", "weight": 27.459060435491963 }, { "coord": "83,333.5714340209961", "weight": 43 }], "42,299.5714340209961": [{ "coord": "42,333.5714340209961", "weight": 34 }, { "coord": "42,260.5714340209961", "weight": 39 }, { "coord": "83,298.5714340209961", "weight": 41.012193308819754 }], "125,299.5714340209961": [{ "coord": "126,333.5714340209961", "weight": 34.0147027033899 }, { "coord": "140,277.5714340209961", "weight": 26.627053911388696 }, { "coord": "126,260.5714340209961", "weight": 39.01281840626232 }, { "coord": "140,318.5714340209961", "weight": 24.20743687382041 }, { "coord": "83,298.5714340209961", "weight": 42.01190307520001 }], "126,260.5714340209961": [{ "coord": "125,299.5714340209961", "weight": 39.01281840626232 }, { "coord": "140,277.5714340209961", "weight": 22.02271554554524 }, { "coord": "139.75,244", "weight": 21.533112304361087 }, { "coord": "83,261.5714340209961", "weight": 43.01162633521314 }, { "coord": "128,224", "weight": 36.6260806851084 }], "140,277.5714340209961": [{ "coord": "139.75,244", "weight": 33.57236485900411 }, { "coord": "140,318.5714340209961", "weight": 41 }, { "coord": "125,299.5714340209961", "weight": 26.627053911388696 }, { "coord": "126,260.5714340209961", "weight": 22.02271554554524 }], "140,318.5714340209961": [{ "coord": "140,277.5714340209961", "weight": 41 }, { "coord": "141,356.5714340209961", "weight": 38.01315561749642 }, { "coord": "126,333.5714340209961", "weight": 20.518284528683193 }, { "coord": "125,299.5714340209961", "weight": 24.20743687382041 }], "141,356.5714340209961": [{ "coord": "140,318.5714340209961", "weight": 38.01315561749642 }, { "coord": "140.75,383", "weight": 26.429748385229903 }, { "coord": "125,373.5714340209961", "weight": 23.345235059857504 }, { "coord": "126,333.5714340209961", "weight": 27.459060435491963 }], "163,420.5714340209961": [{ "coord": "201.75,445", "weight": 45.80739389869879 }, { "coord": "174.75,383", "weight": 39.36591361055987 }, { "coord": "200.75,391", "weight": 47.953437937838466 }, { "coord": "126,405.5714340209961", "weight": 39.92492955535426 }, { "coord": "109,451.5714340209961", "weight": 62.26556030423239 }, { "coord": "140,451.5714340209961", "weight": 38.600518131237564 }], "109,451.5714340209961": [{ "coord": "140,451.5714340209961", "weight": 31 }, { "coord": "46,452.5714340209961", "weight": 63.00793600809346 }, { "coord": "109,416.5714340209961", "weight": 33.06055050963308 }, { "coord": "163,420.5714340209961", "weight": 62.26556030423239 }], "140,451.5714340209961": [{ "coord": "201.75,445", "weight": 61.75148717883934 }, { "coord": "109,451.5714340209961", "weight": 31.78049716414141 }, { "coord": "163,420.5714340209961", "weight": 38.600518131237564 }, { "coord": "109,416.5714340209961", "weight": 46.75467891024384 }], "46,452.5714340209961": [{ "coord": "109,451.5714340209961", "weight": 67.00746227100382 }, { "coord": "47,417.5714340209961", "weight": 35.014282800023196 }], "42,372.5714340209961": [{ "coord": "47,417.5714340209961", "weight": 45.27692569068709 }, { "coord": "83,372.5714340209961", "weight": 41 }, { "coord": "42,333.5714340209961", "weight": 39 }], "82,398.5714340209961": [{ "coord": "47,417.5714340209961", "weight": 39.824615503479755 }, { "coord": "109,416.5714340209961", "weight": 30.4138126514911 }, { "coord": "83,372.5714340209961", "weight": 26.019223662515376 }], "47,417.5714340209961": [{ "coord": "46,452.5714340209961", "weight": 37.33630940518894 }, { "coord": "82,398.5714340209961", "weight": 40.24922359499622 }, { "coord": "109,416.5714340209961", "weight": 68.00735254367721 }, { "coord": "42,372.5714340209961", "weight": 44.181444068749045 }], "42,333.5714340209961": [{ "coord": "42,372.5714340209961", "weight": 40.19950248448356 }, { "coord": "42,299.5714340209961", "weight": 33.24154027718932 }, { "coord": "83,333.5714340209961", "weight": 41 }], "42,260.5714340209961": [{ "coord": "83,261.5714340209961", "weight": 41.012193308819754 }, { "coord": "42,299.5714340209961", "weight": 37.05401462729781 }, { "coord": "45,224", "weight": 36.694274571819385 }], "83,298.5714340209961": [{ "coord": "83,261.5714340209961", "weight": 37 }, { "coord": "83,333.5714340209961", "weight": 35 }, { "coord": "42,299.5714340209961", "weight": 39.01281840626232 }, { "coord": "125,299.5714340209961", "weight": 44.01136216933077 }], "83,261.5714340209961": [{ "coord": "126,260.5714340209961", "weight": 42 }, { "coord": "83,298.5714340209961", "weight": 37.05401462729781 }, { "coord": "42,260.5714340209961", "weight": 42 }], "83,333.5714340209961": [{ "coord": "83,298.5714340209961", "weight": 35.014282800023196 }, { "coord": "83,372.5714340209961", "weight": 39 }, { "coord": "42,333.5714340209961", "weight": 40 }, { "coord": "126,333.5714340209961", "weight": 44 }], "83,372.5714340209961": [{ "coord": "82,398.5714340209961", "weight": 25 }, { "coord": "42,372.5714340209961", "weight": 40.01249804748511 }, { "coord": "125,373.5714340209961", "weight": 43 }, { "coord": "83,333.5714340209961", "weight": 40.01249804748511 }], "45,224": [{ "coord": "42,260.5714340209961", "weight": 36.694274571819385 }, { "coord": "44,186", "weight": 38.01315561749642 }, { "coord": "128,224", "weight": 83 }], "128,224": [{ "coord": "126,260.5714340209961", "weight": 36.6260806851084 }, { "coord": "45,224", "weight": 83 }, { "coord": "139.75,244", "weight": 23.19617425352724 }, { "coord": "140,202", "weight": 25.059928172283335 }, { "coord": "126,188", "weight": 36.05551275463989 }], "126,188": [{ "coord": "44,186", "weight": 82.02438661763951 }, { "coord": "96,168", "weight": 36.05551275463989 }, { "coord": "128,224", "weight": 36.05551275463989 }, { "coord": "140,202", "weight": 19.79898987322333 }], "44,186": [{ "coord": "45,224", "weight": 38.01315561749642 }, { "coord": "45,168", "weight": 18.027756377319946 }, { "coord": "126,188", "weight": 82.02438661763951 }], "95,138": [{ "coord": "95,98", "weight": 40 }, { "coord": "45,138", "weight": 50 }, { "coord": "96,168", "weight": 30.01666203960727 }, { "coord": "137,137", "weight": 42.01190307520001 }], "141,98": [{ "coord": "95,98", "weight": 46 }, { "coord": "172,98", "weight": 31 }, { "coord": "137,137", "weight": 39.20459156782532 }, { "coord": "132.5,80", "weight": 19.90602923739438 }], "140,202": [{ "coord": "128,224", "weight": 25.059928172283335 }, { "coord": "126,188", "weight": 19.79898987322333 }, { "coord": "139.75,244", "weight": 42.000744041028604 }, { "coord": "137,137", "weight": 65.06919393998976 }], "206,97": [{ "coord": "172,98", "weight": 34.0147027033899 }, { "coord": "206.75,244", "weight": 147.00191325285533 }, { "coord": "240,97", "weight": 34 }], "240,97": [{ "coord": "206,97", "weight": 34 }, { "coord": "241.75,244", "weight": 147.0104162976216 }, { "coord": "274,98", "weight": 34.0147027033899 }], "274,98": [{ "coord": "240,97", "weight": 34.0147027033899 }, { "coord": "275.75,244", "weight": 146.01048763701874 }, { "coord": "307,97", "weight": 33.015148038438355 }], "307,97": [{ "coord": "274,98", "weight": 33.015148038438355 }, { "coord": "307.75,243", "weight": 146.00192635715462 }, { "coord": "340,98", "weight": 33.015148038438355 }], "340,98": [{ "coord": "341.75,243", "weight": 145.0105599603008 }, { "coord": "307,97", "weight": 33.015148038438355 }, { "coord": "377,98", "weight": 37 }], "377,98": [{ "coord": "340,98", "weight": 37 }, { "coord": "378.75,243", "weight": 145.0105599603008 }], "96,168": [{ "coord": "45,168", "weight": 51 }, { "coord": "95,138", "weight": 26.019223662515376 }, { "coord": "126,188", "weight": 40 }], "45,168": [{ "coord": "44,186", "weight": 23 }, { "coord": "45,138", "weight": 30 }, { "coord": "96,168", "weight": 52.23983154643591 }], "45,138": [{ "coord": "45,168", "weight": 29.017236257093817 }, { "coord": "45,98", "weight": 40 }, { "coord": "95,138", "weight": 51.0098029794274 }], "95,98": [{ "coord": "45,98", "weight": 50 }, { "coord": "95,138", "weight": 37 }, { "coord": "141,98", "weight": 46.09772228646444 }, { "coord": "77.5,83", "weight": 23.04886114323222 }, { "coord": "132.5,80", "weight": 41.59627387158614 }], "45,98": [{ "coord": "45,138", "weight": 36.013886210738214 }, { "coord": "95,98", "weight": 50.08991914547278 }, { "coord": "77.5,83", "weight": 35.79455265819088 }], "172,98": [{ "coord": "141,98", "weight": 32.0624390837628 }, { "coord": "173.75,244", "weight": 148.0019003256377 }, { "coord": "206,97", "weight": 33.015148038438355 }], "137,137": [{ "coord": "140,202", "weight": 61 }, { "coord": "141,98", "weight": 43.01162633521314 }, { "coord": "95,138", "weight": 45.09988913511872 }], "77.5,83": [{ "coord": "95,98", "weight": 23.04886114323222 }, { "coord": "45,98", "weight": 35.79455265819088 }, { "coord": "78.5,44", "weight": 39.01281840626232 }], "132.5,80": [{ "coord": "131.5,46", "weight": 34.0147027033899 }, { "coord": "141,98", "weight": 19.90602923739438 }, { "coord": "95,98", "weight": 41.59627387158614 }], "131.5,46": [{ "coord": "78.5,44", "weight": 53.03772242470448 }, { "coord": "132.5,80", "weight": 26.019223662515376 }], "78.5,44": [{ "coord": "77.5,83", "weight": 31.016124838541646 }, { "coord": "131.5,46", "weight": 55.326304774492215 }] };

// export const SHOPS = [
//     { id: 1, shopBrandId: 1, name: 'Balla', address: 'Sofia, Bulgaria avenue 55, 1404 Motopista', shopGoogleMapsSrc: 'https://maps.google.com/maps?q=%D0%91%D0%B8%D0%BB%D0%BB%D0%B0%20%D0%B1%D1%83%D0%BB.%20%E2%80%9E%D0%91%D1%8A%D0%BB%D0%B3%D0%B0%D1%80%D0%B8%D1%8F%E2%80%9C%2055%2C%201404%20%D0%9C%D0%BE%D1%82%D0%BE%D0%BF%D0%B8%D1%81%D1%82%D0%B0%2C%20%D0%A1%D0%BE%D1%84%D0%B8%D1%8F&t=&z=17&ie=UTF8&iwloc=&output=embed', map: MOCK_MAP, mapEntryPoint: "429.75,470", mapImage: ShopMap },
//     { id: 2, shopBrandId: 1, name: 'Balla', address: 'Sofia, Polkovnik Georgi Yankov str. 17, 1797 Mladost 1', shopGoogleMapsSrc: 'https://maps.google.com/maps?q=%D0%91%D0%B8%D0%BB%D0%B0%20%D0%BC%D1%83%D1%81%D0%B0%D0%B3%D0%B5%D0%BD%D0%B8%D1%86%D0%B0&t=&z=17&ie=UTF8&iwloc=&output=embed', map: MOCK_MAP, mapEntryPoint: "429.75,470", mapImage: ShopMap },
//     { id: 3, shopBrandId: 2, name: 'Kaaufland', address: 'Sofia, Todor Kableshkov str. 3, 1618 Bukston', shopGoogleMapsSrc: 'https://maps.google.com/maps?q=%D0%9A%D0%B0%D1%83%D1%84%D0%BB%D0%B0%D0%BD%D0%B4%20%D0%A1%D0%BE%D1%84%D0%B8%D1%8F%20-%20%D0%92%D0%B8%D1%82%D0%BE%D1%88%D0%B0%20%D1%83%D0%BB.%20%E2%80%9E%D0%A2%D0%BE%D0%B4%D0%BE%D1%80%20%D0%9A%D0%B0%D0%B1%D0%BB%D0%B5%D1%88%D0%BA%D0%BE%D0%B2%E2%80%9C%203%2C%201618%20%D0%91%D1%8A%D0%BA%D1%81%D1%82%D0%BE%D0%BD%2C%20%D0%A1%D0%BE%D1%84%D0%B8%D1%8F&t=&z=17&ie=UTF8&iwloc=&output=embed', map: MOCK_MAP, mapEntryPoint: "429.75,470", mapImage: ShopMap },
//     { id: 4, shopBrandId: 2, name: 'Kaaufland', address: 'Sofia, Filip Avramov str. 3, 1712 Mladost 3', shopGoogleMapsSrc: 'https://maps.google.com/maps?q=%D0%9A%D0%B0%D1%83%D1%84%D0%BB%D0%B0%D0%BD%D0%B4%20%D0%9C%D0%BB%D0%B0%D0%B4%D0%BE%D1%81%D1%82&t=&z=17&ie=UTF8&iwloc=&output=embed', map: MOCK_MAP, mapEntryPoint: "429.75,470", mapImage: ShopMap },
// ]

// export const PRODUCTS = [
//     { id: 1, name: 'Balla Bread White', shopBrandId: 1, shopId: 1, coordinates: '21,34', price: 0.89, image: 'https://i0.wp.com/gatherforbread.com/wp-content/uploads/2015/08/Easiest-Yeast-Bread.jpg?fit=800%2C1157&ssl=1' },
//     { id: 2, name: 'Balla Bread Brown', shopBrandId: 1, shopId: 1, coordinates: '253,54', price: 0.89, image: 'https://i0.wp.com/gatherforbread.com/wp-content/uploads/2015/08/Easiest-Yeast-Bread.jpg?fit=800%2C1157&ssl=1' },
//     { id: 11, name: 'Cleverr Chocolate', shopBrandId: 1, shopId: 1, coordinates: '70,50', price: 0.99, image: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Chocolat.png' },
//     { id: 13, name: 'Cleverr Ice cream', shopBrandId: 1, shopId: 1, coordinates: '50,30', price: 1.05, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTCVlQgNeFjOyMgdmzRufZmCU37XoCd7hKZ77ZcaxOflsnxuaHK&usqp=CAU' },
//     { id: 14, name: 'Balla Milk', shopBrandId: 1, shopId: 1, coordinates: '300,300', description: 'This product is with very high quality. Made from happy cows.', price: 1.50, image: 'https://33q47o1cmnk34cvwth15pbvt120l-wpengine.netdna-ssl.com/wp-content/uploads/raw-milk-1-e1563894986431-755x1024.jpg' },
//     { id: 15, name: 'Clever Water', shopBrandId: 1, shopId: 1, coordinates: '400,123', price: 0.30, image: 'https://www.brecorder.com/wp-content/uploads/2018/07/water-3.jpg' },
//     { id: 16, name: 'Devin', shopBrandId: 1, shopId: 1, coordinates: '400,204', price: 0.60, image: 'https://www.brecorder.com/wp-content/uploads/2018/07/water-3.jpg' },
//     { id: 3, name: 'Balla Milk', shopBrandId: 1, shopId: 2, coordinates: '266,354', description: 'This product is with very high quality. Made from happy cows.', price: 1.50, image: 'https://33q47o1cmnk34cvwth15pbvt120l-wpengine.netdna-ssl.com/wp-content/uploads/raw-milk-1-e1563894986431-755x1024.jpg' },
//     { id: 4, name: 'Balla Bread White', shopBrandId: 1, shopId: 2, coordinates: '353,115', price: 0.89, image: 'https://i0.wp.com/gatherforbread.com/wp-content/uploads/2015/08/Easiest-Yeast-Bread.jpg?fit=800%2C1157&ssl=1' },
//     { id: 5, name: 'Balla Milk', shopBrandId: 1, shopId: 2, coordinates: '26,234', description: 'This product is with very high quality. Made from happy cows.', price: 1.50, image: 'https://33q47o1cmnk34cvwth15pbvt120l-wpengine.netdna-ssl.com/wp-content/uploads/raw-milk-1-e1563894986431-755x1024.jpg' },
//     { id: 6, name: 'Clever Water', shopBrandId: 1, shopId: 2, coordinates: '223,344', price: 0.30, image: 'https://www.brecorder.com/wp-content/uploads/2018/07/water-3.jpg' },
//     { id: 7, name: 'Devin', shopBrandId: 1, shopId: 2, coordinates: '400,204', price: 0.60, image: 'https://www.brecorder.com/wp-content/uploads/2018/07/water-3.jpg' },
//     { id: 10, name: 'Cleverr Chocolate', shopBrandId: 1, shopId: 2, coordinates: '94,234', price: 0.99, image: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Chocolat.png' },
//     { id: 12, name: 'Cleverr Ice cream', shopBrandId: 1, shopId: 2, coordinates: '100,250', price: 1.05, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTCVlQgNeFjOyMgdmzRufZmCU37XoCd7hKZ77ZcaxOflsnxuaHK&usqp=CAU' },
//     { id: 8, name: 'Kaafland Bread', shopBrandId: 2, shopId: 3, coordinates: '231,74', price: 0.68, image: 'https://i0.wp.com/gatherforbread.com/wp-content/uploads/2015/08/Easiest-Yeast-Bread.jpg?fit=800%2C1157&ssl=1' },
//     { id: 9, name: 'Kaafland Bread', shopBrandId: 2, shopId: 4, coordinates: '41,64', price: 0.68, image: 'https://i0.wp.com/gatherforbread.com/wp-content/uploads/2015/08/Easiest-Yeast-Bread.jpg?fit=800%2C1157&ssl=1' },

// ]
// export const SHOPS_BRANDS = [
//     { id: 1, name: 'Balla', shopsIds: [1, 2], productsIds: [1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16], image: ballaImageUrl },
//     { id: 2, name: 'Kaaufland', shopsIds: [3, 4], productsIds: [8, 9], image: KaauflandImageUrl }
// ]