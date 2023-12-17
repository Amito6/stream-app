import { Button, Carousel, Icon } from "../../../Tailwind";

const Header =() =>{

    const Caption = ({data}) =>{
        const cap = (
            <>
           <div className="flex flex-col gap-4 sm:gap-10 px-5">
                <div className="text-white mb:3 font-bold text-2xl sm:text-8xl">
                    <h1>{data.title}</h1>
                    <div className="flex gap-16 items-center">
                        <div>
                            {
                                Array(data.rating).fill("a").map((item,index)=>{
                                    return <Icon key={index} className="text-red-600">star</Icon>
                                })
                            }
                            {
                                Array(5-(data.rating)).fill("a").map((item,index)=>{
                                    return <Icon key={index} className="text-red-600">star_outline</Icon>
                                })
                            }
                        </div>
                        <p className="text-white text-lg">
                        <span className="font-bold text-red-500">
                            Duration : &nbsp;
                        </span>
                       {data.duration}
                    </p>
                    </div>
                </div>

                <div className="text-white flex flex-col gap-0 sm:gap-2">
                    <p className="text-sm sm:text-lg">
                        <span className="font-bold text-red-500">
                            Staring : &nbsp;
                        </span>
                       {data.staring}
                    </p>
                    <p className="text sm:text-lg">
                        <span className="font-bold text-red-500">
                            Category : &nbsp;
                        </span>
                        {data.category}
                    </p>
                    <p className="text sm:text-lg">
                        <span className="font-bold text-red-500">
                            Tags : &nbsp;
                        </span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, harum?
                    </p>
                </div>

                <div>
                    <Button className="flex gap-2 py-1 sm:py-3.5 px-2 sm:px-6">
                        <Icon>play_circle</Icon>
                        Play Now
                    </Button>
                </div>
            </div>
            </>

        );
        return cap;
    }

    const data = [
        {
            image : "sanddust2.jpg",
            caption : <Caption data={{
                title:"Stream Just",
                rating : 5,
                duration: "02:20:17",
                staring:"Amir khan",
                category : "Comedy,drama,action",
                tags :"Comedy,drama,action"
            }} />
        },
        {
            image : "movie-abc.png",
            caption :<Caption data={{
                title:"Amir Khan",
                rating : 4,
                duration: "02:20:17",
                staring:"Amir khan",
                category : "Comedy,drama,action",
                tags :"Comedy,drama,action"
            }} />
        },
        {
            image : "movie-xyz.png",
            caption : <Caption data={{
                title:"Just for code",
                rating : 2,
                duration: "02:20:17",
                staring:"Amir khan",
                category : "Comedy,drama,action",
                tags :"Comedy,drama,action"
            }} />
        }
    ]

    const design = (
        <>
            <div className="hidden sm:block">
                <Carousel
                    data={data} 
                    height={600} 
                    counting={false}
                 />
            </div>
            <div className="block sm:hidden">
                <Carousel
                    data={data} 
                    height={300} 
                    counting={false}
                 />
            </div>
        </>
    );
    return design;
}

export default Header;