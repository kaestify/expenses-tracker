import { Navbar } from "./layout/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ExpensesPage } from "./components/ExpensesPage";
import { HomePage } from "./components/HomePage";
import { SetGoalPage } from "./components/SetGoalPage";
import { EditGoalPage } from "./components/EditGoalPage";
import { oktaConfig } from "./lib/oktaConfig";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, SecureRoute, Security } from "@okta/okta-react";
import LoginWidget from "./Auth/LoginWidget";
import PrivateRoutes from "./components/PrivateRoutes";
import EditExpensePage from "./components/EditExpensePage";

function App() {
  const oktaAuth = new OktaAuth(oktaConfig);
  const customAuthHandler = () => {
    navigate("/login");
  };
  const navigate = useNavigate();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    return navigate(toRelativeUrl(originalUri || "/", window.location.origin), {
      replace: true,
    });
  };
  return (
    <>
      <Security
        oktaAuth={oktaAuth}
        restoreOriginalUri={restoreOriginalUri}
        onAuthRequired={customAuthHandler}
      >
        <Navbar />

        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/editexpense/:id" element={<EditExpensePage />} />
            <Route path="/setgoal" element={<SetGoalPage />} />
            <Route path="/editgoal/:id" element={<EditGoalPage />} />
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route path="/login" element={<LoginWidget config={oktaConfig} />} />
          <Route path="/login/callback" element={<LoginCallback />} />
        </Routes>
      </Security>
    </>
  );
}

export default App;
