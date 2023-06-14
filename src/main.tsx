import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@/app/scss/app.scss';
import '@/app/scss/vars/decoration.scss';
import '@/app/scss/vars/dark-theme.scss';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
