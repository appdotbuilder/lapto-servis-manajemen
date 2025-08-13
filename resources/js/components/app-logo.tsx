// import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-blue-600 text-white">
                <span className="text-lg">💻</span>
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">ServiceLab Pro</span>
                <span className="truncate text-xs text-muted-foreground">Manajemen Service</span>
            </div>
        </>
    );
}
