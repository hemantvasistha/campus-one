/* CAMPUS ONE — DATA LAYER
   Every value below was taken directly from official documents supplied
   by BRCM College of Engineering & Technology, Bahal. Nothing here is
   invented. Where the college has not yet supplied information, the
   value "Will be added soon…" is used deliberately so the UI can show
   it — do not replace it with guessed data.
*/

const WILL_ADD = "Will be added soon…";

const CAMPUS_ONE_DATA = {

  college: {
    name: "BRCM College of Engineering & Technology",
    society: "BRCM Education Society, Bahal",
    location: "Bahal, District Bhiwani",
    campusName: "BRCM Vidyagram Campus (Bahal)",
  },

  /* ---------------- TIMETABLES ----------------
     Source: TIME_TABLE_SECTION-1_CSE.pdf and TIME_TABLE_SECTION_A2_AI_ML.pdf
     B.Tech 1st Sem, Department of Applied Sciences & Humanities,
     Odd Semester 2026-27, Effective From 24.08.2026
  */
  timetables: {
    periods: [
      { no: "I",    time: "9:00 AM – 9:45 AM" },
      { no: "II",   time: "9:45 AM – 10:30 AM" },
      { no: "III",  time: "10:30 AM – 11:15 AM" },
      { no: "IV",   time: "11:15 AM – 12:00 PM" },
      { no: "V",    time: "12:00 PM – 12:45 PM" },
      { no: "VI",   time: "12:45 PM – 1:35 PM  (LUNCH)" },
      { no: "VII",  time: "1:35 PM – 2:15 PM" },
      { no: "VIII", time: "2:15 PM – 2:55 PM" },
    ],
    sections: {
      "A1": {
        label: "Section A1 (CSE)",
        classCoordinator: "Dr. Manisha",
        timetableIncharge: "Mr. Navneet Bulla",
        effectiveFrom: "24.08.2026",
        days: {
          MONDAY:    ["Physics-I", "Maths-I", "English", "EGD", "PPS", "", "Physics Lab (P1) / English Lab (P2)", "Physics Lab (P1) / English Lab (P2)"],
          TUESDAY:   ["Physics-I", "PPS", "Maths-I", "BME", "English", "", "EGD Lab (P1) / PPS Lab (P2)", "EGD Lab (P1) / PPS Lab (P2)"],
          WEDNESDAY: ["EGD", "Physics-I", "PPS", "Maths-I", "BME", "", "PPS Lab (P1) / EGD Lab (P2)", "PPS Lab (P1) / EGD Lab (P2)"],
          THURSDAY:  ["BME", "Maths-I", "English", "PPS", "Physics-I", "", "English Lab (P1) / Physics Lab (P2)", "English Lab (P1) / Physics Lab (P2)"],
          FRIDAY:    ["Maths-I", "PPS", "BME", "Physics-I", "BME", "", "Physics-I (T)", "Maths-I (T)"],
        },
        faculty: [
          ["Mathematics-I", "Ms. Deeksha"],
          ["English", "Ms. Axeena"],
          ["Physics-I", "Dr. Manisha"],
          ["PPS: Programming for Problem Solving", "Mr. Dushyant Kaushik"],
          ["EGD: Engineering Graphics & Design", "Mr. Suresh Kumar"],
          ["BME: Basic Mechanical Engineering", "Ms. Navneet Bulla"],
          ["Physics Lab", "Dr. Manisha"],
          ["English Language Lab", "Ms. Axeena"],
          ["PPS Lab", "Mr. Dushyant Kaushik"],
          ["EGD Lab", "Mr. Suresh Kumar"],
        ],
      },
      "A2": {
        label: "Section A2 (CSE + AI/ML)",
        classCoordinator: "Ms. Deeksha",
        timetableIncharge: "Mr. Navneet Bulla",
        effectiveFrom: "24.08.2026",
        days: {
          MONDAY:    ["English", "Physics-I", "PPS", "BME", "Maths-I", "", "PPS LAB", "PPS LAB"],
          TUESDAY:   ["BME", "Maths-I", "PPS", "EGD", "Physics-I", "", "ENGLISH LAB", "ENGLISH LAB"],
          WEDNESDAY: ["BME", "PPS", "English", "Physics-I", "Maths-I", "", "PHYSICS LAB", "PHYSICS LAB"],
          THURSDAY:  ["Physics-I", "PPS", "Maths-I", "BME", "EGD", "", "EGD LAB", "EGD LAB"],
          FRIDAY:    ["BME", "English", "Physics-I", "PPS", "Maths-I", "", "Maths-I (T)", "Physics-I (T)"],
        },
        faculty: [
          ["Mathematics-I", "Ms. Deeksha"],
          ["English & Language Lab", "Ms. Axeena"],
          ["Physics-I", "Dr. Lalit Kumar"],
          ["PPS: Programming for Problem Solving", "Mr. Dushyant Kaushik"],
          ["EGD: Engineering Graphics & Design", "Mr. Suresh Kumar"],
          ["BME: Basic Mechanical Engineering", "Mr. Navneet Bulla"],
          ["Physics Lab", "Dr. Lalit Kumar"],
          ["English Language Lab", "Ms. Axeena"],
          ["PPS Lab", "Mr. Dushyant Kaushik"],
          ["EGD Lab", "Mr. Suresh Kumar"],
        ],
      },
    },
  },

  /* ---------------- BUS ----------------
     Source: Bus_Time_Table.pdf and Bus_Route_Coordinators.pdf
     Only morning arrival times were supplied — return timings are
     not yet available.
  */
  bus: {
    note: "Only the morning up-route timings have been shared by the transport office. Return/evening timings and live status are " + WILL_ADD,
    coordinators: [
      { name: "Sh. Upender Prasad", route: "Overall Incharge", contact: "9813491717" },
      { name: "Sh. Jaiveer", route: "Tosham", contact: "9992286633" },
      { name: "Sh. Ladhu Ram", route: "Jui", contact: "9813135717" },
      { name: "Mr. Ram Ghanghas", route: "Bhiwani", contact: "7056394868" },
      { name: "Dr. Satya Naryan", route: "Siwani", contact: "8053859853" },
      { name: "Ms. Manisha", route: "Badhra", contact: "8397919902" },
    ],
    routes: [
      {
        name: "Badhra",
        campusArrival: "8:55",
        stops: [
          ["Jitpura/ Umarwas", "7:10"], ["Kakroli", "7:20"], ["Gopi", "7:25"],
          ["Badhra", "7:30"], ["Kari Modh", "7:35"], ["Kari Mela", "7:40"],
          ["Kari Tokha/ Baniya", "7:45"], ["Dhigwa", "7:55"], ["Singhani", "8:10"],
          ["Kharkari", "8:15"], ["Pahari", "8:20"], ["Sehar", "8:25"],
          ["Budheri", "8:30"], ["Paju", "8:35"], ["Nangal", "8:40"],
          ["Sorda Jadid", "8:45"], ["Sorda Kadim", "8:50"],
        ],
      },
      {
        name: "Tosham",
        campusArrival: "8:55",
        stops: [
          ["Tosham", "7:00"], ["Kharkari/Jhanwari", "7:05"], ["Alampur", "7:10"],
          ["Thilor", "7:15"], ["Pataudi", "7:20"], ["Sandwa", "7:25"],
          ["Bushan", "7:30"], ["Katwar", "7:32"], ["Bhariwas", "7:40"],
          ["Khawa", "7:45"], ["Jhully", "7:50"], ["Mandhan", "7:55"],
          ["Isharwal", "8:00"], ["Gopalwas", "8:15"], ["Mandholikalan", "8:20"],
          ["Kasani kalan", "8:30"], ["Kasani Khurd", "8:35"], ["Gokalpura", "8:40"],
        ],
      },
      {
        name: "Siwani",
        campusArrival: "8:55",
        stops: [
          ["Siwani", "7:35"], ["Bakhatawarpura", "7:40"], ["Sherpura", "7:45"],
          ["Gudha", "7:55"], ["Kalod", "7:55"], ["Kalali", "8:05"],
          ["Bidhwan", "8:10"], ["Siwach", "8:20"], ["Mandholi Khurd", "8:22"],
          ["Surpura Kalan", "8:30"], ["Surpura Khurd", "8:35"], ["Garwa", "8:40"],
        ],
      },
      {
        name: "Jui",
        campusArrival: "8:50",
        stops: [
          ["Jui", "7:15"], ["Pohkarwas", "7:20"], ["Dandma", "7:30"],
          ["Dwarka", "7:35"], ["Shyamkalan", "7:40"], ["Kural", "7:55"],
          ["Dhigwa", "8:00"], ["Budhera", "8:07"], ["Manphara", "8:10"],
          ["Nakipur", "8:25"], ["Chahar kalan", "8:30"], ["Chahar khurd", "8:35"],
          ["Sarsi", "8:40"],
        ],
      },
      {
        name: "Bhiwani",
        campusArrival: "8:55",
        stops: [
          ["Bhiwani", "7:00"], ["Lohani", "7:40"], ["Titani", "7:45"],
          ["Hetampura", "7:50"], ["Leghan", "7:55"], ["Simali Mor", "8:00"],
          ["Kairu", "8:05"], ["Khaparwas", "8:10"], ["Devrala", "8:15"],
          ["Obra", "8:25"], ["Noonsar", "8:35"], ["Bidhnoi", "8:40"],
          ["Sherla", "8:45"],
        ],
      },
    ],
  },

  /* ---------------- CANTEEN ----------------
     Source: supplied canteen menu image.
  */
  canteen: {
    items: [
      { name: "Chaw Mein", price: 60 }, { name: "Chole Bhature", price: 60 },
      { name: "Momos", price: 70 }, { name: "Fries", price: 50 },
      { name: "Pasta", price: 150 }, { name: "Maggie Plane", price: 40 },
      { name: "Burger Chaw Mein", price: 40 }, { name: "Maggie Veg", price: 50 },
      { name: "Sandwich", price: 80 }, { name: "Cholla Samosa", price: 40 },
      { name: "Fried Rice", price: 100 }, { name: "Samosa", price: 20 },
      { name: "Spring Roll", price: 60 }, { name: "Bread Pakoda", price: 20 },
      { name: "Manchurian", price: 100 }, { name: "Patties", price: 20 },
      { name: "Chilli Potatoes", price: 100 },
    ],
    openingTime: "9:00 AM",
    closingTime: "8:00 PM",
    weekendNote: "Canteen is also open on Saturday and Sunday for hostlers.",
    tuckShop: {
      name: "Tuck Shop",
      location: "In front of the canteen",
      note: "All students can purchase accessories and everyday essentials such as notebooks, pens, hostel items, and more."
    },
  },

  /* ---------------- CAMPUS MAP ----------------
     Source: BRCM Vidyagram Campus (Bahal) signage — "Facilities at
     Vidyagram Campus" legend, numbered 1–78.
  */
  map: {
    title: "BRCM Vidyagram Campus (Bahal)",
    facilities: [
      [1,"BRCM Vidyagram Campus Gate, Pilani Road"],[2,"BRCM Education Society/Trust Office"],
      [3,"Post Graduation Block (GDC Memorial College)"],[4,"Swami Vivekananda Auditorium"],
      [5,"Cooling Plant"],[6,"Flora Foundation"],[7,"Director Residence"],
      [8,"Richa, Vidushree, Cadambiree Hostel"],[9,"Partibha, Pragya, Prerana"],
      [10,"Vipula-Vasudha Hostel (Sainik School)"],[11,"Physical Education Dept. (GDC)"],
      [12,"Skating Rink"],[13,"Shruti Sadan Hostel"],[14,"Tubewell No=1"],
      [15,"Staff Quarter (A,D,AD)"],[16,"Indoor Rifle Shooting Range"],
      [17,"BRCM ES Infirmary"],[18,"Annapurna Mess"],[19,"Laundry"],[20,"PNB ATM"],
      [21,"BRCM Vidyagram Campus Main Gate"],[22,"Security Office"],
      [23,"Vidyagram Sports Field"],[24,"Cricket Net"],[25,"Basket Ball Court"],
      [26,"Mast Light -1"],[27,"Campus Security Room"],[28,"Sports Complex"],
      [29,"Basketball Court"],[30,"Children's Play Ground"],[31,"Volleyball Court (Staff)"],
      [32,"Bhabha Hostel"],[33,"Abdulkalam Hostel"],[34,"Kalpana Chawla Hostel"],
      [35,"Common Utility Area (Pharmacy College)"],[36,"Proposed BRCM College of Pharmacy"],
      [37,"Indoor Swimming Pool"],[38,"Mast Light - 2"],[39,"Athletics Track/Football Field"],
      [40,"Mast Light - 3"],[41,"Buster Pump"],[42,"Raman Hostel"],
      [43,"Aryabhatt Hostel"],[44,"Tagore Staff Enclave"],[45,"Sewerage Pump"],
      [46,"Sub-Station-2"],[47,"STP 6 LACS Litre Capacity"],[48,"STP Control Room"],
      [49,"Mast Light - 4"],[50,"Open Amphitheater"],[51,"BRCM Law College"],
      [52,"GDC Memorial College"],[53,"Engineering College"],[54,"Kabaddi Ground"],
      [55,"Sports Activity Centre"],[56,"Basketball Court"],[57,"Volleyball Courts"],
      [58,"Play Field"],[59,"High Mast Light -5"],[60,"Vermicompost/Herbal Park"],
      [61,"Tubewell (57B)-4"],[62,"Tubewell No-2"],[63,"O.H.W.T"],
      [64,"Central Workshop"],[65,"Landfill"],[66,"Agriculture Land"],
      [67,"Tubewell No-3"],[68,"Mast Light - 6"],[69,"Security Room (Staff Gate)"],
      [70,"Staff Quarter (B,NB,C,E,F,G)"],[71,"Swasti Sadan (Guest House)"],
      [72,"Staff Quarter (H,I,J,L)"],[73,"Canteen College"],[74,"Tuck Shop"],
      [75,"Media Center"],[76,"Barber Shop"],[77,"Tailor Shop"],[78,"Jio Tower"],
    ],
    note: "Room-level, department-level and timing details for individual locations are " + WILL_ADD,
  },

};
