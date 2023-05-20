import Header from "./Header";
import Footer from "./Footer";
import MainDownload from "./MainDownload";

function Download(props) {
  return (
    <div>
      <Header />
      <MainDownload fileId={props.fileId} />
      <Footer />
    </div>
  );
}

export default Download;
