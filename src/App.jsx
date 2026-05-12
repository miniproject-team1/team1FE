import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

import { GlobalStyle } from "./styles/Globalstyle";
import Header from "./components/Header";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import Diary from "./pages/Diary";
import Mypage from "./pages/Mypage";
import MypageChange from "./pages/MypageChange";
import Wishlist from "./pages/Wishlist";
import WishlistDelete from "./pages/WishlistDelete";
import WishlistPlus from "./pages/WishlistPlus";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />

      <AppWrapper>
        <AppContainer>
          <Header />

          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/main" element={<Main />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/mypage-change" element={<MypageChange />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/wishlist-delete" element={<WishlistDelete />} />
            <Route path="/wishlist-plus" element={<WishlistPlus />} />
          </Routes>
        </AppContainer>
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-main-bg);
`;

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-main-bg);
`;
