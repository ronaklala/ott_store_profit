import Home from "./Components/Home";
import Header from "./shared/Header";
import TopNav from "./shared/TopNav";

const Dashboard = () => {
  return (
    <>
      <div className="page-wrapper toggled">
        <Header />
        <main className="page-content bg-light">
          <TopNav />
          <Home />
        </main>
        {/*End page-content" */}
      </div>
    </>
  );
};

export default Dashboard;
