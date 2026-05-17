import Header from './Header';
import Item from './Item';
import Footer from './Footer';
import './App.css';

export default function App() {
    return (
        <div className="app-shell">
            <Header />
            <main className="app-main">
                <Item />
            </main>
            <Footer />
        </div>
    );
}

