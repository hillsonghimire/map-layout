var subjectObject = {
    "Province_1": {
        "Bhojpur": ["Aamchowk Gaunpalika", "Arun Gaunpalika", "Bhojpur Nagarpalika", "Hatuwagadhi Gaunpalika", "Pauwadungma Gaunpalika", "Ramprasad Rai Gaunpalika", "Salpasilichho Gaunpalika", "Shadananda Nagarpalika", "Tyamkemaiyung Gaunpalika"],
        "Dhankuta": ["Chaubise Gaunpalika", "Chhathar Jorpati Gaunpalika", "Dhankuta Nagarpalika", "Shahidbhumi Gaunpalika", "Mahalaxmi Nagarpalika", "Pakhribas Nagarpalika", "Sangurigadhi Gaunpalika"],
        "Ilam": ["Chulachuli Gaunpalika", "Deumai Nagarpalika", "Fakphokthum Gaunpalika", "Illam Nagarpalika", "Mai Nagarpalika", "Maijogmai Gaunpalika", "Mangsebung Gaunpalika", "Rong Gaunpalika", "Sandakpur Gaunpalika", "Suryodaya Nagarpalika"],
        "Jhapa": ["Arjundhara Nagarpalika", "Barhadashi Gaunpalika", "Bhadrapur Nagarpalika", "Birtamod Nagarpalika", "Buddhashanti Gaunpalika", "Damak Nagarpalika", "Gauradhaha Nagarpalika", "Gauriganj Gaunpalika", "Haldibari Gaunpalika", "Jhapa Gaunpalika", "Kachankawal Gaunpalika", "Kamal Gaunpalika", "Kankai Nagarpalika", "Mechinagar Nagarpalika", "Shivasataxi Nagarpalika"],
        "Khotang": ["Ainselukhark Gaunpalika", "Barahapokhari Gaunpalika", "Diprung Gaunpalika", "Halesi Tuwachung Nagarpalika", "Jantedhunga Gaunpalika", "Kepilasagadhi Gaunpalika", "Khotehang Gaunpalika", "Rawa Besi Gaunpalika", "Rupakot Majhuwagadhi Nagarpalika", "Sakela Gaunpalika"],
        "Morang": ["Belbari Nagarpalika", "Biratnagar Mahanagarpalika", "Budhiganga Gaunpalika", "Dhanpalthan Gaunpalika", "Gramthan Gaunpalika", "Jahada Gaunpalika", "Kanepokhari Gaunpalika", "Katahari Gaunpalika", "Kerabari Gaunpalika", "Letang Nagarpalika", "Miklajung Gaunpalika", "Patahrishanishchare Nagarpalika", "Rangeli Nagarpalika", "Ratuwamai Nagarpalika", "Sundarharaicha Nagarpalika", "Sunwarshi Nagarpalika", "Uralabari Nagarpalika"],
        "Okhandhunga": ["Champadevi Gaunpalika", "Chisankhugadhi Gaunpalika", "Khijidemba Gaunpalika", "Likhu Gaunpalika", "Manebhanjyang Gaunpalika", "Molung Gaunpalika", "Siddhicharan Nagarpalika", "Sunkoshi Gaunpalika"],
        "Panchthar": ["Falelung Gaunpalika", "Falgunanda Gaunpalika", "Hilihang Gaunpalika", "Kummayak Gaunpalika", "Miklajung Gaunpalika", "Phidim Nagarpalika", "Tumbewa Gaunpalika", "Yangwarak Gaunpalika"],
        "Sankhuwasabha": ["Bhotkhola Gaunpalika", "Chainpur Nagarpalika", "Chichila Gaunpalika", "Dharmadevi Nagarpalika", "Khandbari Nagarpalika", "Madi Nagarpalika", "Makalu Gaunpalika", "Panchakhapan Nagarpalika", "Sabhapokhari Gaunpalika", "Silichong Gaunpalika"],
        "Solukhumbu": ["Thulung Dudhkoshi Gaunpalika", "Dudhkoshi Gaunpalika", "Khumbupasanglahmu Gaunpalika", "Likhupike Gaunpalika", "Mahakulung Gaunpalika", "Nechasalyan Gaunpalika", "Solududhakunda Nagarpalika", "Sotang Gaunpalika"],
        "Sunsari": ["Barah Nagarpalika", "Barju Gaunpalika", "Bhokraha Narsingh Gaunpalika", "Dewanganj Gaunpalika", "Dharan Upamahanagarpalika", "Duhabi Nagarpalika", "Gadhi Gaunpalika", "Harinagar Gaunpalika", "Inaruwa Nagarpalika", "Itahari Upamahanagarpalika", "Koshi Gaunpalika", "Ramdhuni Nagarpalika", "Koshi Tappu Wildlife Reserve"],
        "Taplejung": ["Aathrai Tribeni Gaunpalika", "Maiwakhola Gaunpalika", "Meringden Gaunpalika", "Mikwakhola Gaunpalika", "Phaktanglung Gaunpalika", "Phungling Nagarpalika", "Sidingba Gaunpalika", "Sirijangha Gaunpalika", "Pathibhara Yangwarak Gaunpalika"],
        "Terhathum": ["Aathrai Gaunpalika", "Chhathar Gaunpalika", "Laligurans Nagarpalika", "Menchayam Gaunpalika", "Myanglung Nagarpalika", "Phedap Gaunpalika"],
        "Udayapur": ["Belaka Nagarpalika", "Chaudandigadhi Nagarpalika", "Katari Nagarpalika", "Rautamai Gaunpalika", "Sunkoshi Gaunpalika", "Tapli Gaunpalika", "Triyuga Nagarpalika", "Udayapurgadhi Gaunpalika", "Koshi Tappu Wildlife Reserve"]



    }
}
window.onload = function () {
    var subjectSel = document.getElementById("subject");

    var topicSel = document.getElementById("topic");
    var chapterSel = document.getElementById("chapter");
    for (var x in subjectObject) {
        subjectSel.options[subjectSel.options.length] = new Option(x, x);
    }
    subjectSel.onchange = function () {
        //empty Chapters- and Topics- dropdowns
        chapterSel.length = 1;
        topicSel.length = 1;
        //display correct values
        for (var y in subjectObject[this.value]) {
            topicSel.options[topicSel.options.length] = new Option(y, y);
        }
    }
    topicSel.onchange = function () {
        //empty Chapters dropdown
        chapterSel.length = 1;
        //display correct values
        var z = subjectObject[subjectSel.value][this.value];
        for (var i = 0; i < z.length; i++) {
            chapterSel.options[chapterSel.options.length] = new Option(z[i], z[i]);

        }
    }
    topicSel

}
// window.onclick = function (event) {
//     if (!event.target.matches('.dropbtn')) {
//         var dropdowns = document.getElementsByClassName("dropdown-content");
//         var i;
//         for (i = 0; i < dropdowns.length; i++) {
//             var openDropdown = dropdowns[i];
//             if (openDropdown.classList.contains('show')) {
//                 openDropdown.classList.remove('show');
//             }
//         }
//     }
// }

// function myFunction() {
//     $('#myDropdown').toggleClass('show');
// }