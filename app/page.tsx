import Header from "./_components/header";
import Search from "./_components/search";

const Home = () => {
  return (
    <h1>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
    </h1>
  );
};

export default Home;
