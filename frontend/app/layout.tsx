import { CartProvider } from './context/cartContext';
import './styles/styles.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <CartProvider>{children}</CartProvider> 
      </body>
    </html>
  );
}
