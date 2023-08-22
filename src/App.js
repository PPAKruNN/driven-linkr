import { BrowserRouter, Routes, Route} from "react-router-dom";
import { PageContainer } from "./style/PageContainer";
import Pages from "./pages";
import UserPage from "./pages/UserPage";
import AuthProvider from "./context/auth.context";

function App() {

  return (
    <AuthProvider>
      <PageContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Pages.SignIn/>} />
            <Route path="/home" element={<Pages.Home />} />
            <Route path="/sign-up" element={<Pages.SignUp />} />
            <Route path="/hashtag/:tagName" element={<Pages.Hashtag />} />
            <Route path="/user/:id" element={<UserPage />} />
            {/* <Route path="*" element={<Pages.Home />} /> */}
          </Routes>
        </BrowserRouter>
      </PageContainer>
    </AuthProvider>
  );
}

export default App;
