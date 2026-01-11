import './Loader.css';

export default function Loader() {
    return (
        <div className="min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex flex-col gap-y-2 justify-center items-center inset-0 z-999 outline-none focus:outline-none" id="modal-id">
            <div className="absolute bg-primary-foreground inset-0"></div>
            <div className="loader bg-primary!"></div>
            <span className="z-1000">Buscando dados...</span>
        </div>
    ); 
}