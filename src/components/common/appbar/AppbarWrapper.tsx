import React from 'react'

interface AppBarContextInterface {
  isAppBarMenuOpen: boolean
  toggleAppBarMenu: (value: boolean) => void
}
const defaultContextValue: AppBarContextInterface = {
  isAppBarMenuOpen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleAppBarMenu: () => {},
}
export const AppBarContext = React.createContext<AppBarContextInterface>(defaultContextValue)

export const AppBarWrapper: React.FC<unknown> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false)

  const toggleAppBar = (value: boolean) => {
    setIsMenuOpen(value)
  }
  return (
    <AppBarContext.Provider
      value={{ isAppBarMenuOpen: isMenuOpen, toggleAppBarMenu: toggleAppBar }}
    >
      {children}
    </AppBarContext.Provider>
  )
}
