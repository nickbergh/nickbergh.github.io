import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import QuizPage from "./pages/QuizPage";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Toaster />
    <Sonner />
    <Routes>
      <Route path="/" element={<QuizPage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/results" element={<Results />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
