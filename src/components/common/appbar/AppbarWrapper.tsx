import React from 'react';

interface AppBarContextInterface {
    isAppBarMenuOpen: boolean;
    toggleAppBarMenu: (value: boolean) => void;
}
const defaultContextValue: AppBarContextInterface = {
    isAppBarMenuOpen: false,
    toggleAppBarMenu: ()=>{}
}
export const AppBarContext = React.createContext<AppBarContextInterface>(defaultContextValue)

export const AppBarWrapper: React.FC<{}> = ({children}) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
    
    const toggleAppBar = (value: boolean) => {
        setIsMenuOpen(value)
    }
    return (
        <AppBarContext.Provider value={{isAppBarMenuOpen: isMenuOpen, toggleAppBarMenu: toggleAppBar}}>
            {children}
        </AppBarContext.Provider>
    )
}