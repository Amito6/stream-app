import { Slider } from "../../../Tailwind";

const UpcomingMovies = () =>{
    const data = [
        {
            thumbnail : "sanddust2.jpg",
            title : "Stream just",
            duration : "02:05:40"
        },
        {
            thumbnail : "movie-abc.png",
            title : "Stream Just",
            duration : "02:05:40"
        },
        {
            thumbnail : "movie-xyz.png",
            title : "Stream Just",
            duration : "02:05:40"
        },
        {
            thumbnail : "sanddust2.jpg",
            title : "Stream just",
            duration : "02:05:40"
        },
        {
            thumbnail : "movie-abc.png",
            title : "Stream Just",
            duration : "02:05:40"
        },
        {
            thumbnail : "movie-xyz.png",
            title : "Stream Just",
            duration : "02:05:40"
        },
        {
            thumbnail : "sanddust2.jpg",
            title : "Stream just",
            duration : "02:05:40"
        },
        {
            thumbnail : "movie-abc.png",
            title : "Stream Just",
            duration : "02:05:40"
        },
        {
            thumbnail : "movie-xyz.png",
            title : "Stream Just",
            duration : "02:05:40"
        }

    ] 
    const design = (
        <>
            <div>
            <h1 className="text-3xl text-white mb-4">Upcoming Movies</h1>
            <Slider data={data} />
            </div>
        </>
    );
    return design;
}

export default UpcomingMovies;