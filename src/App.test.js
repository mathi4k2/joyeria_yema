import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders Relojería Benítez app', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // Verificar que la aplicación se renderiza sin errores
  expect(screen.getByRole('main')).toBeInTheDocument();
});
