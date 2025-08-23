import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import QuizPage from "./pages/QuizPage";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  // DEPLOYMENT TEST - Force rebuild timestamp: 2025-08-22
  console.log('App component loaded - deployment test');
  
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<QuizPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/results" element={<Results />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
