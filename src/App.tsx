import React, { useState } from 'react';
import {
    Map, Calendar, MapPin, Plane, Navigation, Hotel, Compass,
    CreditCard, ExternalLink, ChevronDown, Ticket, Info, Sun, Sparkles, Navigation2
} from 'lucide-react';

// --- TYPESCRIPT INTERFACES ---

interface Accommodation {
    name: string;
    price: string;
    desc: string;
}

interface Transport {
    route: string;
    cost: string;
    bookVia: string;
}

interface Spot {
    name: string;
    distance: string;
    desc: string;
    cost: string;
}

interface City {
    id: string;
    name: string;
    region: string;
    nights: number;
    theme: string;
    vibe: string;
    accommodations: Accommodation[];
    transport: Transport;
    nearbySpots?: Spot[];
    highlights: string[];
    coords: { x: number; y: number };
}

interface Day {
    day: number;
    date: string;
    title: string;
    location: string;
    transport: string;
    desc: string;
}

// --- DATA ---

const cities: City[] = [
    {
        id: 'hanoi-1',
        name: 'Hanoi',
        region: 'North',
        nights: 2,
        theme: 'Street Food & Culture',
        vibe: 'Bustling, historic, atmospheric',
        accommodations: [
            { name: 'Moonlit Suites Hotel', price: '€30-40/night', desc: 'Your friend\'s recommendation! Highly rated, excellent central location, and a premium boutique feel.' }
        ],
        transport: {
            route: 'Flight arrival into Noi Bai (HAN)',
            cost: 'Taxi to Old Quarter: ~€12 (300,000 VND)',
            bookVia: 'Grab App (book when you land using airport Wi-Fi)'
        },
        highlights: ['Egg coffee hidden cafes', 'Bia Hoi (fresh beer) on the street', 'Hoan Kiem Lake at dawn'],
        coords: { x: 35, y: 15 }
    },
    {
        id: 'ninh-binh',
        name: 'Ninh Binh',
        region: 'North',
        nights: 3,
        theme: 'River Karsts & Rice Paddies',
        vibe: 'Peaceful, dramatic scenery, rural',
        accommodations: [
            { name: 'Gecko Backpackers', price: '€10-15/night', desc: 'Friend\'s reco: Highly social, younger crowd, great for meeting people over beers. Note: Definitely a "party hostel" vibe compared to a quiet homestay.' },
            { name: 'Tam Coc Horizon Bungalow', price: '€30-35/night', desc: 'Alternative: Private bungalow against the cliffs with a pool. Still social at breakfast, but much more relaxing.' }
        ],
        transport: {
            route: 'Train: Hanoi -> Ninh Binh',
            cost: '€8 - €12 (SE7 or SE19 train, ~2.5 hrs)',
            bookVia: 'Baolau.com or 12Go.asia (reliable for foreign cards)'
        },
        highlights: ['Trang An boat ride', 'Cycling through rice paddies', 'Hang Mua viewpoint'],
        coords: { x: 40, y: 30 }
    },
    {
        id: 'hue',
        name: 'Hue',
        region: 'Central',
        nights: 2,
        theme: 'Imperial History & Royal Cuisine',
        vibe: 'Quiet, historic, poetic',
        accommodations: [
            { name: 'Hue River Side Villa', price: '€25-30/night', desc: 'Right on the water, free bicycles, incredibly peaceful.' },
            { name: 'Sahi Homestay Retreat', price: '€30-35/night', desc: 'Stunning minimalist wood architecture, zen garden.' }
        ],
        transport: {
            route: 'Sleeper Train: Ninh Binh -> Hue',
            cost: '€25 - €35 (SE19 train, ~11 hrs overnight)',
            bookVia: 'Baolau.com (Book a 4-berth "Soft Sleeper" cabin)'
        },
        highlights: ['Imperial Citadel', 'Bun Bo Hue (local spicy noodle soup)', 'Abandoned Water Park (Thuy Tien Lake)'],
        coords: { x: 65, y: 65 }
    },
    {
        id: 'da-nang',
        name: 'Da Nang (via Hai Van Pass)',
        region: 'Central',
        nights: 9,
        theme: 'Beaches, Friends & Coastlines',
        vibe: 'Modern coastal city, surf culture, expat hubs',
        accommodations: [
            { name: 'Rom Casa Hostel (Private Room)', price: '€25-30/night', desc: 'Made from shipping containers, awesome pool, highly social.' },
            { name: 'Eco Green Boutique Hotel', price: '€30-35/night', desc: 'Near My Khe beach, great breakfast, modern and clean.' }
        ],
        transport: {
            route: 'Train: Hue -> Da Nang',
            cost: '€5 - €8 (Daytime train, ~3 hrs)',
            bookVia: 'Baolau.com (Request a "Soft Seat" on the LEFT side of the train for ocean views)'
        },
        nearbySpots: [
            { name: 'Nam O Village', distance: '30 mins North', desc: 'Centuries-old fishing village. Watch them make traditional fish sauce in giant vats and eat "Goi Ca" (local raw fish salad). Book a standard Grab car/bike.', cost: '~€5-7 each way via Grab.' },
            { name: 'Cam Kim Island', distance: '45 mins South', desc: 'Rural artisan island near Hoi An. Woodcarving, mat weaving, and rice paper making. Grab to the bridge, then rent a bicycle to cross and explore.', cost: '~€10-15 Grab to bridge + €2 bike rental.' },
            { name: 'Tam Thanh Mural Village', distance: '1.5 hrs South', desc: 'Authentic, poor fishing village beautifully painted by artists. You MUST use "GrabRent" for a 4-6 hour block, otherwise you will be stranded.', cost: '~€25-35 total for the half-day driver hire.' }
        ],
        highlights: ['Visiting your friend!', 'GrabRent day trips to coastal villages', 'Day trips to Hoi An', 'Seafood feasts on the beach'],
        coords: { x: 75, y: 75 }
    },
    {
        id: 'hanoi-2',
        name: 'Hanoi (Return)',
        region: 'North',
        nights: 1,
        theme: 'Farewell',
        vibe: 'Nostalgic',
        accommodations: [
            { name: 'Oriental Suites Hotel', price: '€35-40/night', desc: 'Treat yourself for the last night. Very close to Hoan Kiem lake.' }
        ],
        transport: {
            route: 'Flight: Da Nang (DAD) -> Hanoi (HAN)',
            cost: '€40 - €60 (1.5 hrs)',
            bookVia: 'VietJet Air or Vietnam Airlines (Book direct on their websites 1-2 months ahead)'
        },
        highlights: ['Last bowls of Pho', 'Souvenir shopping', 'Relaxing before the flight'],
        coords: { x: 35, y: 15 }
    }
];

const itineraryDays: Day[] = [
    { day: 1, date: 'June 30', title: 'Arrival in Chaos', location: 'Hanoi', transport: 'Flight -> Taxi', desc: 'Arrive in Hanoi. Check into your Old Quarter homestay. Get lost in the 36 streets, grab a bowl of Pho, and sit on a plastic stool for Bia Hoi (fresh beer) to people-watch.' },
    { day: 2, date: 'July 1', title: 'Hidden Cafes & Culture', location: 'Hanoi', transport: 'Walk / Grab', desc: 'Explore the cafe culture. Try egg coffee at Cafe Giang. Walk around Hoan Kiem Lake. Evening street food tour to get your palate adjusted to northern flavors.' },
    { day: 3, date: 'July 2', title: 'Escape to the Karsts', location: 'Ninh Binh', transport: 'Train (2.5 hrs)', desc: 'Morning train to Ninh Binh. Check into your bungalow near Tam Coc. Rent a bicycle and ride through the stunning limestone karsts and rice paddies as the sun sets.' },
    { day: 4, date: 'July 3', title: 'Boats & Viewpoints', location: 'Ninh Binh', transport: 'Bicycle / Grab', desc: 'Early morning Trang An boat ride (avoid the crowds). In the afternoon, climb the 500 steps of Hang Mua for a breathtaking panoramic view of the river and mountains.' },
    { day: 5, date: 'July 4', title: 'Rural Life & Night Train', location: 'Ninh Binh', transport: 'Grab -> Night Train', desc: 'A slow day. Cycle to Thai Vi temple, drink coffee by the lotus ponds. Late evening (around 9 PM), board the overnight sleeper train heading south to Hue.' },
    { day: 6, date: 'July 5', title: 'The Imperial City', location: 'Hue', transport: 'Arrival via Train', desc: 'Arrive in Hue around 8 AM. Drop bags at your riverside villa. In the afternoon, explore the massive, historic Imperial Citadel. Dinner must be Bun Bo Hue.' },
    { day: 7, date: 'July 6', title: 'Dragons & Tombs', location: 'Hue', transport: 'Grab / Taxi', desc: 'Take a Grab to visit the famous (and slightly eerie) abandoned water park at Thuy Tien Lake. Later, visit the spectacular royal tombs like Khai Dinh.' },
    { day: 8, date: 'July 7', title: 'The Hai Van Pass', location: 'Da Nang', transport: 'Train (3 hrs)', desc: 'Take the daytime train from Hue to Da Nang. This is the most scenic train ride in Vietnam, hugging the coastline over the mountains. Arrive in Da Nang and meet your friend!' },
    { day: 9, date: 'July 8', title: 'Settling into Da Nang', location: 'Da Nang', transport: 'Grab', desc: 'Beach day at My Khe. Catch up with your friend, explore their favorite local spots via Grab, and enjoy a massive fresh seafood dinner by the ocean.' },
    { day: 10, date: 'July 9', title: 'Monkey Mountain', location: 'Da Nang', transport: 'Grab / Friend', desc: 'Explore the Son Tra Peninsula. Spot the rare Red-shanked douc langurs (monkeys), visit the Lady Buddha, and find hidden coves.' },
    { day: 11, date: 'July 10', title: 'Lanterns & History', location: 'Da Nang / Hoi An', transport: 'Grab (45m)', desc: 'Take a late afternoon trip down to Hoi An ancient town. The architecture is stunning. Wait for sunset to see the thousands of silk lanterns light up the river.' },
    { day: 12, date: 'July 11', title: 'Nam O Fishing Village', location: 'Da Nang', transport: 'Standard Grab', desc: 'Take a Grab north to Nam O Village. See traditional fish sauce made in giant vats, watch fishermen repair nets, and try the local specialty: Goi Ca.' },
    { day: 13, date: 'July 12', title: 'Cam Kim Artisans', location: 'Da Nang', transport: 'Grab & Bicycle', desc: 'Take a Grab south towards Hoi An. Rent bicycles near the bridge and ride into Cam Kim Island to see families doing traditional woodcarving and weaving.' },
    { day: 14, date: 'July 13', title: 'Tam Thanh Mural Coast', location: 'Da Nang', transport: 'GrabRent (Half-Day)', desc: 'Hire a driver via GrabRent for a 1.5-hour ride south. They will wait while you explore the Tam Thanh fishing community beautifully painted with art.' },
    { day: 15, date: 'July 14', title: 'Nature & Waterfalls', location: 'Da Nang', transport: 'GrabRent', desc: 'Use GrabRent to head out to Hoa Phu Thanh or local waterfalls/springs just outside the city for a swim in nature, away from the coastal heat.' },
    { day: 16, date: 'July 15', title: 'Final Beach Day', location: 'Da Nang', transport: 'Walk', desc: 'Your last full day in Da Nang. Enjoy a final beach sunrise, a farewell dinner with your friend, and pack up.' },
    { day: 17, date: 'July 16', title: 'Return to the North', location: 'Hanoi', transport: 'Flight (1.5 hrs)', desc: 'Take a cheap, quick domestic flight from Da Nang back to Hanoi. One last evening to grab street food, buy souvenirs, and soak in the Old Quarter energy.' },
    { day: 18, date: 'July 17', title: 'Departure', location: 'Hanoi', transport: 'Grab to Airport', desc: 'Enjoy a final Vietnamese iced coffee (Ca Phe Sua Da). Head to Noi Bai Airport for your flight home. Safe travels!' }
];

export default function App() {
    const [activeTab, setActiveTab] = useState<string>('experimental');
    const [expandedCityId, setExpandedCityId] = useState<string | null>('da-nang');
    const [expandedDayDetailsId, setExpandedDayDetailsId] = useState<number | null>(null);
    const [isCoastalGuideExpanded, setIsCoastalGuideExpanded] = useState<boolean>(false);

    // State for Experimental Dashboard
    const [selectedDashboardDay, setSelectedDashboardDay] = useState<number>(1);

    // Non-null assertions because we know our static data matches up
    const currentDayData = itineraryDays.find(d => d.day === selectedDashboardDay)!;
    const currentCityData = cities.find(c => c.name.includes(currentDayData.location) || currentDayData.location.includes(c.name.split(' ')[0]));

    const toggleCity = (id: string) => setExpandedCityId(expandedCityId === id ? null : id);
    const toggleDayDetail = (day: number) => setExpandedDayDetailsId(expandedDayDetailsId === day ? null : day);

    return (
        <div className="min-h-screen bg-stone-100 text-neutral-800 font-sans pb-12 selection:bg-teal-200">

            {/* HEADER */}
            <header className="bg-teal-800 text-white pt-10 pb-6 px-4 sm:px-6 shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                <div className="max-w-5xl mx-auto relative z-10">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight">Vietnam: The Local Explorer</h1>
                    <p className="text-teal-100 text-base sm:text-lg flex items-center gap-2 mb-4">
                        <Calendar size={18} /> June 30 - July 17 • ~€30/Night Budget
                    </p>
                    <div className="flex bg-teal-900/50 p-1 rounded-xl w-full max-w-2xl overflow-x-auto backdrop-blur-sm border border-teal-700/50 shadow-inner">
                        <button
                            onClick={() => setActiveTab('experimental')}
                            className={`flex-1 py-2 px-3 text-sm sm:text-base text-center font-medium rounded-lg whitespace-nowrap transition-all flex justify-center items-center gap-2 ${activeTab === 'experimental' ? 'bg-white text-teal-800 shadow-sm' : 'text-teal-100 hover:bg-teal-800/50'}`}
                        >
                            <Sparkles size={16} /> Smart Dash
                        </button>
                        <button
                            onClick={() => setActiveTab('map')}
                            className={`flex-1 py-2 px-3 text-sm sm:text-base text-center font-medium rounded-lg whitespace-nowrap transition-all flex justify-center items-center gap-2 ${activeTab === 'map' ? 'bg-white text-teal-800 shadow-sm' : 'text-teal-100 hover:bg-teal-800/50'}`}
                        >
                            <Map size={16} /> Route
                        </button>
                        <button
                            onClick={() => setActiveTab('cities')}
                            className={`flex-1 py-2 px-3 text-sm sm:text-base text-center font-medium rounded-lg whitespace-nowrap transition-all flex justify-center items-center gap-2 ${activeTab === 'cities' ? 'bg-white text-teal-800 shadow-sm' : 'text-teal-100 hover:bg-teal-800/50'}`}
                        >
                            <MapPin size={16} /> City Details
                        </button>
                        <button
                            onClick={() => setActiveTab('days')}
                            className={`flex-1 py-2 px-3 text-sm sm:text-base text-center font-medium rounded-lg whitespace-nowrap transition-all flex justify-center items-center gap-2 ${activeTab === 'days' ? 'bg-white text-teal-800 shadow-sm' : 'text-teal-100 hover:bg-teal-800/50'}`}
                        >
                            <Calendar size={16} /> List
                        </button>
                        <button
                            onClick={() => setActiveTab('coastal')}
                            className={`flex-1 py-2 px-3 text-sm sm:text-base text-center font-medium rounded-lg whitespace-nowrap transition-all flex justify-center items-center gap-2 ${activeTab === 'coastal' ? 'bg-white text-teal-800 shadow-sm' : 'text-teal-100 hover:bg-teal-800/50'}`}
                        >
                            <Compass size={16} /> Coastal
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto p-4 sm:p-6 mt-2">

                {/* EXPERIMENTAL DASHBOARD TAB */}
                {activeTab === 'experimental' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-neutral-800 flex items-center gap-2">
                                Daily Dashboard
                            </h2>
                            <div className="bg-white px-3 py-1.5 rounded-full shadow-sm border border-stone-200 text-sm font-semibold text-teal-700">
                                {currentDayData.date}
                            </div>
                        </div>

                        {/* Day Selector Slider */}
                        <div className="w-full overflow-x-auto hide-scrollbar pb-4 mb-2">
                            <div className="flex gap-2 min-w-max px-1">
                                {itineraryDays.map((day) => (
                                    <button
                                        key={`dash-day-${day.day}`}
                                        onClick={() => setSelectedDashboardDay(day.day)}
                                        className={`flex flex-col items-center justify-center w-14 h-16 rounded-xl border transition-all ${selectedDashboardDay === day.day ? 'bg-teal-600 border-teal-700 text-white shadow-md scale-105' : 'bg-white border-stone-200 text-stone-500 hover:border-teal-300 hover:bg-teal-50'}`}
                                    >
                                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">Day</span>
                                        <span className="text-xl font-black">{day.day}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Bento Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            {/* Box 1: The Plan */}
                            <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-100 to-transparent rounded-bl-full opacity-50"></div>
                                <div>
                                    <div className="flex items-center gap-2 text-teal-600 font-semibold mb-2">
                                        <Navigation2 size={18} /> {currentDayData.location}
                                    </div>
                                    <h3 className="text-3xl font-bold text-stone-800 mb-4">{currentDayData.title}</h3>
                                    <p className="text-stone-600 text-lg leading-relaxed">
                                        {currentDayData.desc}
                                    </p>
                                </div>
                                <div className="mt-8 flex gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 text-stone-700 rounded-lg text-sm font-medium">
                    <Sun size={16} className="text-amber-500" /> Day {currentDayData.day} of 18
                  </span>
                                </div>
                            </div>

                            {/* Box 2: Logistics / Transport */}
                            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm">
                                <h4 className="text-sm uppercase tracking-widest text-stone-400 font-bold mb-4 flex items-center gap-2">
                                    <Ticket size={16} /> Logistics
                                </h4>
                                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 mb-4">
                                    <p className="text-sm text-stone-500 mb-1">Transport</p>
                                    <p className="font-semibold text-stone-800">{currentDayData.transport}</p>
                                </div>
                                {currentCityData && currentCityData.transport && (
                                    <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100">
                                        <p className="text-xs text-teal-600 font-semibold mb-1">Booking Tip</p>
                                        <p className="text-sm text-stone-700 font-medium">{currentCityData.transport.cost}</p>
                                        <p className="text-xs text-stone-500 mt-1">{currentCityData.transport.bookVia}</p>
                                    </div>
                                )}
                            </div>

                            {/* Box 3: Accommodation */}
                            {currentCityData && currentCityData.accommodations && currentCityData.accommodations.length > 0 && (
                                <div className="md:col-span-3 bg-stone-900 text-white rounded-3xl p-6 border border-stone-800 shadow-lg relative overflow-hidden flex flex-col md:flex-row gap-6 items-center">
                                    <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md">
                                        <Hotel size={32} className="text-teal-300" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-teal-400 font-semibold text-sm uppercase tracking-wider mb-1">Basecamp: {currentCityData.name}</h4>
                                        <p className="text-lg font-medium text-stone-200 mb-2">Recommended: {currentCityData.accommodations[0].name}</p>
                                        <p className="text-sm text-stone-400">{currentCityData.accommodations[0].desc}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-2xl font-bold text-white">{currentCityData.accommodations[0].price}</p>
                                        <p className="text-xs text-stone-400">Estimated Budget</p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                )}

                {/* MAP TAB */}
                {activeTab === 'map' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-bold mb-6 text-neutral-800">Visual Route Overview</h2>
                        <div className="flex flex-col lg:flex-row gap-8">

                            <div className="w-full lg:w-1/3 bg-blue-50 rounded-3xl p-4 border border-blue-100 flex items-center justify-center relative overflow-hidden min-h-[500px] shadow-inner">
                                <div className="absolute top-0 right-0 w-full h-full opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiAvPgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iI2FhYSIgc3Ryb2tlLXdpZHRoPSIwLjUiIC8+Cjwvc3ZnPg==')]"></div>

                                <svg viewBox="0 0 100 100" className="w-full h-full z-10 drop-shadow-md">
                                    <path d="M 20 5 Q 30 20 40 40 T 70 75 Q 75 90 65 95" fill="none" stroke="#a7f3d0" strokeWidth="8" strokeLinecap="round" />
                                    <path d="M 20 5 Q 30 20 40 40 T 70 75 Q 75 90 65 95" fill="none" stroke="#047857" strokeWidth="2" strokeLinecap="round" strokeDasharray="2,2" />

                                    {cities.map((city, index) => {
                                        if (index === cities.length - 1) return null;
                                        const nextCity = cities[index + 1];
                                        return (
                                            <line
                                                key={`line-${index}`}
                                                x1={city.coords.x} y1={city.coords.y}
                                                x2={nextCity.coords.x} y2={nextCity.coords.y}
                                                stroke="#0f766e" strokeWidth="1.5"
                                            />
                                        );
                                    })}

                                    <path
                                        d={`M ${cities[3].coords.x} ${cities[3].coords.y} Q 90 40 ${cities[4].coords.x} ${cities[4].coords.y}`}
                                        fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3"
                                    />

                                    {cities.map((city, index) => (
                                        <g key={`node-${index}`}>
                                            <circle cx={city.coords.x} cy={city.coords.y} r="3" fill={index === cities.length-1 ? "#f59e0b" : "#0f766e"} />
                                            <circle cx={city.coords.x} cy={city.coords.y} r="1.5" fill="#fff" />
                                            <text
                                                x={city.coords.x - 5}
                                                y={city.coords.y + 1}
                                                fontSize="3.5"
                                                fontWeight="bold"
                                                fill="#1f2937"
                                                textAnchor="end"
                                            >
                                                {city.name.split(' ')[0]}
                                            </text>
                                        </g>
                                    ))}
                                </svg>
                            </div>

                            <div className="w-full lg:w-2/3 flex flex-col justify-center space-y-4">
                                {cities.map((city, i) => (
                                    <div key={city.id + i} className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-stone-200 relative group hover:border-teal-400 transition-colors">
                                        {i !== cities.length - 1 && (
                                            <div className="absolute top-14 bottom-[-1.25rem] left-[2.2rem] w-px bg-stone-200 group-hover:bg-teal-200 transition-colors"></div>
                                        )}
                                        <div className="w-10 h-10 mt-1 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border-2 border-teal-100 z-10">
                                            {i === cities.length - 1 ? <Plane size={18} className="text-amber-500" /> : <MapPin size={18} />}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-stone-800">{city.name}</h3>
                                            <p className="text-teal-600 font-semibold text-sm mb-2">{city.nights} Night{city.nights > 1 ? 's' : ''} • {city.theme}</p>
                                            <p className="text-stone-500 text-sm leading-relaxed">{city.vibe}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* CITIES TAB */}
                {activeTab === 'cities' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
                        <div className="bg-teal-50 p-4 rounded-2xl border border-teal-100 flex items-start gap-3">
                            <Info className="text-teal-600 shrink-0 mt-0.5" size={20} />
                            <p className="text-sm text-teal-800 leading-relaxed">
                                I've curated specific boutique homestays and precise transport booking details for each leg.
                                Expand a city to see where to stay, how to get there, and the specific daily breakdown for that region.
                            </p>
                        </div>

                        {cities.map((city) => (
                            <div key={`city-detail-${city.id}`} className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden transition-all duration-300">
                                <button
                                    onClick={() => toggleCity(city.id)}
                                    className="w-full flex items-center justify-between p-6 cursor-pointer hover:bg-stone-50 transition-colors"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-stone-100 text-stone-600 flex items-center justify-center shrink-0">
                                            {city.name.includes('Da Nang') ? <Waves aria-setsize = {24} /> : city.name.includes('Ninh Binh') ? <Compass size={24} /> : <Navigation size={24} />}
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-bold text-xl text-stone-800">{city.name}</h3>
                                            <p className="text-stone-500 font-medium text-sm mt-1">{city.nights} Night{city.nights > 1 ? 's' : ''} • {city.theme}</p>
                                        </div>
                                    </div>
                                    <div className={`text-stone-400 transition-transform duration-300 ${expandedCityId === city.id ? 'rotate-180' : ''}`}>
                                        <ChevronDown size={24} />
                                    </div>
                                </button>

                                {expandedCityId === city.id && (
                                    <div className="px-6 pb-6 pt-2 border-t border-stone-100 bg-stone-50/50">

                                        {/* Booking & Logistics Grid */}
                                        <div className="grid md:grid-cols-2 gap-4 mt-4 mb-6">

                                            {/* Accommodations Card */}
                                            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                                                <h4 className="font-bold text-stone-800 flex items-center gap-2 mb-3 border-b border-stone-100 pb-2">
                                                    <Hotel size={18} className="text-teal-600" /> Curated Stays
                                                </h4>
                                                <div className="space-y-4">
                                                    {city.accommodations.map((acc, idx) => (
                                                        <div key={idx}>
                                                            <div className="flex justify-between items-start mb-1">
                                                                <span className="font-semibold text-stone-800 text-sm">{acc.name}</span>
                                                                <span className="text-teal-600 font-bold text-xs bg-teal-50 px-2 py-1 rounded">{acc.price}</span>
                                                            </div>
                                                            <p className="text-xs text-stone-500 leading-relaxed">{acc.desc}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Transport Card */}
                                            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                                                <h4 className="font-bold text-stone-800 flex items-center gap-2 mb-3 border-b border-stone-100 pb-2">
                                                    <Ticket size={18} className="text-amber-500" /> Transit & Booking
                                                </h4>
                                                <ul className="space-y-3">
                                                    <li className="flex flex-col">
                                                        <span className="text-xs text-stone-400 uppercase font-bold tracking-wider">Route</span>
                                                        <span className="text-sm font-medium text-stone-700">{city.transport.route}</span>
                                                    </li>
                                                    <li className="flex flex-col">
                                                        <span className="text-xs text-stone-400 uppercase font-bold tracking-wider">Estimated Cost</span>
                                                        <span className="text-sm font-medium text-stone-700">{city.transport.cost}</span>
                                                    </li>
                                                    <li className="flex flex-col">
                                                        <span className="text-xs text-stone-400 uppercase font-bold tracking-wider">How to Book</span>
                                                        <span className="text-sm font-medium text-teal-700 flex items-center gap-1">
                              {city.transport.bookVia} <ExternalLink size={12} />
                            </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Da Nang Specific Mini-Guide */}
                                        {city.nearbySpots && (
                                            <div className="mb-6 bg-blue-50/50 rounded-2xl border border-blue-100 overflow-hidden">
                                                <button
                                                    onClick={() => setIsCoastalGuideExpanded(!isCoastalGuideExpanded)}
                                                    className="w-full flex items-center justify-between p-5 hover:bg-blue-100/50 transition-colors"
                                                >
                                                    <h4 className="font-bold text-blue-900 flex items-center gap-2">
                                                        <Navigation2 size={18} /> Da Nang Coastal Mini-Guide
                                                    </h4>
                                                    <ChevronDown size={20} className={`text-blue-600 transition-transform ${isCoastalGuideExpanded ? 'rotate-180' : ''}`} />
                                                </button>

                                                {isCoastalGuideExpanded && (
                                                    <div className="p-5 pt-0 space-y-4">
                                                        {city.nearbySpots.map((spot, idx) => (
                                                            <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-blue-50">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <span className="font-bold text-stone-800">{spot.name}</span>
                                                                    <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">{spot.distance}</span>
                                                                </div>
                                                                <p className="text-sm text-stone-600 mb-2">{spot.desc}</p>
                                                                <p className="text-xs font-medium text-stone-400 flex items-center gap-1">
                                                                    <CreditCard size={12} /> {spot.cost}
                                                                </p>
                                                            </div>
                                                        ))}
                                                        <button
                                                            onClick={() => {
                                                                setActiveTab('coastal');
                                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                                            }}
                                                            className="w-full mt-2 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
                                                        >
                                                            Open Full Coastal Guide
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Nested Day-by-Day for this specific city */}
                                        <div className="mt-6">
                                            <h4 className="font-bold text-stone-800 mb-3 ml-1">Itinerary for {city.name}</h4>
                                            <div className="space-y-2">
                                                {itineraryDays
                                                    .filter(d => d.location.includes(city.name.split(' ')[0]) || city.name.includes(d.location))
                                                    .map((day) => (
                                                        <div key={`nested-day-${day.day}`} className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                                                            <button
                                                                onClick={() => toggleDayDetail(day.day)}
                                                                className="w-full text-left p-4 flex items-center justify-between hover:bg-stone-50"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className="bg-teal-100 text-teal-800 font-bold text-xs uppercase px-2 py-1 rounded shrink-0">
                                                                        Day {day.day}
                                                                    </div>
                                                                    <span className="font-semibold text-stone-800 text-sm">{day.title}</span>
                                                                </div>
                                                                <ChevronDown size={16} className={`text-stone-400 transition-transform ${expandedDayDetailsId === day.day ? 'rotate-180' : ''}`} />
                                                            </button>
                                                            {expandedDayDetailsId === day.day && (
                                                                <div className="p-4 pt-0 text-sm text-stone-600 border-t border-stone-100 bg-stone-50">
                                                                    <p className="mt-3">{day.desc}</p>
                                                                    <div className="mt-3 text-xs font-medium text-stone-400 flex items-center gap-1">
                                                                        <MapPin size={12} /> Transport for the day: {day.transport}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>

                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* COASTAL TAB */}
                {activeTab === 'coastal' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-8 text-center max-w-2xl mx-auto">
                            <h2 className="text-3xl font-bold text-stone-800 mb-3">Da Nang Coastal Expeditions</h2>
                            <p className="text-stone-600">You have 9 days in Da Nang. Use them to escape the city and discover authentic artisan and fishing villages using Grab.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {cities.find(c => c.id === 'da-nang')?.nearbySpots?.map((spot, idx) => (
                                <div key={`coastal-${idx}`} className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm flex flex-col hover:border-blue-300 transition-colors">
                                    <div className="h-48 bg-stone-100 relative">
                                        <img
                                            src={`https://placehold.co/600x400/e2e8f0/64748b?text=${encodeURIComponent(spot.name)}`}
                                            alt={spot.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-700 shadow-sm">
                                            {spot.distance}
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold text-stone-800 mb-3">{spot.name}</h3>
                                        <p className="text-stone-600 text-sm leading-relaxed flex-1 mb-6">
                                            {spot.desc}
                                        </p>

                                        <div className="bg-stone-50 rounded-xl p-4 border border-stone-100 space-y-3">
                                            <div className="flex items-start gap-3">
                                                <Navigation size={16} className="text-stone-400 shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs font-bold text-stone-400 uppercase">How to get there</p>
                                                    <p className="text-sm font-medium text-stone-700">
                                                        {spot.name.includes('Tam Thanh') ? 'GrabRent (Required)' : 'Standard Grab Car/Bike'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <CreditCard size={16} className="text-stone-400 shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs font-bold text-stone-400 uppercase">Estimated Cost</p>
                                                    <p className="text-sm font-medium text-stone-700">{spot.cost}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}

// Icon Wrapper typed for TypeScript
function Waves(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.6 2 5 2 2.3 0 2.3-2 5-2 1.3 0 1.9.5 2.5 1"/>
            <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.6 2 5 2 2.3 0 2.3-2 5-2 1.3 0 1.9.5 2.5 1"/>
            <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.6 2 5 2 2.3 0 2.3-2 5-2 1.3 0 1.9.5 2.5 1"/>
        </svg>
    );
}