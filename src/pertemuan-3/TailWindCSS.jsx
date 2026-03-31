export default function TailWindCSS() {
    return (
        <div>
            <h1 class="border m-4">Belajar TailWind CSS 4 </h1>
            <button className="bg-purple-700 text-white
                               px-4 py-2 mx-4 rounded 
                               shadow-lg">Click Me</button>
            <Spacing title="Card" content="ABCDEFGHI"/>
            <Typography/>
            <BorderRadius/>
            <BackgroundColors/>
            <FlexboxGrid/>
            <ShadowEffects/>
        </div>
    )
}

function ShadowEffects(){
    return (
        <div className="bg-white shadow-lg p-6 rounded-lg hover:shadow-md transition">
            <h3 className="text-xl font-semibold">Hover me!</h3>
            <p className="text-gray-600 mt-2">Lihat efek bayangan saat hover.</p>
        </div>
    )
}

function Spacing(props){
    return (
        <div className="bg-white shadow-lg p-6 m-4 rounded-lg">
            <h2 className="text-lg font-semibold">{props.title}</h2>
            <p className="mt-2 text-gray-600">{props.content}.</p>
        </div>
    )
}

function Typography(){
    return (
        <div className="p-4">
            <h1 className="text-3xl font-extrabold text-purple-500">Tailwind Typography</h1>
            <p className="text-gray-400 text-lg mt-2">Belajar Tailwind sangat menyenangkan dan cepat!</p>
        </div>
    )
}

function BorderRadius(){
    return (
        <div className="p-4">
            <button className="border-2 border-purple-400 text-purple-400 ml-4 px-4 py-2 rounded-l-lg"> Klik Saya </button>
            <button className="border-2 border-purple-400 text-purple-400 ml-4 px-4 py-2 rounded-r-lg"> Klik Saya </button>
        </div>
    ) 
}

function BackgroundColors(){
    return(
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Tailwind Colors</h3>
            <p className="mt-2">Belajar Tailwind itu seru dan fleksibel!</p>
        </div>
    )
}

function FlexboxGrid(){
    return (
        <nav className="flex justify-between bg-purple-800 p-4 text-white">
            <h1 className="text-lg font-bold">MyWebsite</h1>
            <ul className="flex space-x-4">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <h1 className="text-lg font-bold">LogOut</h1>
        </nav>
    )
}

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       