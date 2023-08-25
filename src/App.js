import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageContainer } from "./style/PageContainer";
import Pages from "./pages";
import UserPage from "./pages/UserPage";
import AuthProvider from "./context/auth.context";
import UserProvider from "./context/user.context";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <PageContainer>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Pages.SignIn />} />
              <Route path="/home" element={<Pages.Home />} />
              <Route path="/sign-up" element={<Pages.SignUp />} />
              <Route path="/hashtag/:tagName" element={<Pages.Hashtag />} />
              <Route path="/user/:id" element={<UserPage />} />
              {/* <Route path="*" element={<Pages.Home />} /> */}
            </Routes>
          </BrowserRouter>
        </PageContainer>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
