import {render,screen} from "@testing-library/react";
import MovieCard from "./MovieCard";
import useFetchMovies from "../hooks/useFetchMovies";
jest.mock("../hooks/useFetchMovies");

jest.mock("axios", () => ({
  create: () => ({
    get: jest.fn(),
    post: jest.fn(),
  }),
}));

describe("MovieList Component",()=>{
    test("showing loading test",()=>{
        useFetchMovies.mockReturnValue({movies:[],loading:true,error:null});
        render(<MovieCard selectedCategory={null}/>);
        expect(screen.getByText('Loading movies...')).toBeInTheDocument();
    });
    test("showing error test",()=>{
        useFetchMovies.mockReturnValue({movies:{},loading:false,error:"failed to fetch"});
        render(<MovieCard selectedCategory={null}/>);
        expect(screen.getByText('Error: failed to fetch')).toBeInTheDocument();
    });
    test("showing movies test",()=>{
        useFetchMovies.mockReturnValue({movies:[{id:2,title:"Movie 2",poster_path:"/path2.jpg",vote_average:7.0},{id:3,title:"Movie 3",poster_path:"/path3.jpg",vote_average:8.0}],loading:false,error:null});
        render(<MovieCard selectedCategory={null}/>);
        expect(screen.getByText('Movie 2')).toBeInTheDocument();
        expect(screen.getByText('Movie 3')).toBeInTheDocument();
    });

})

