import { createContext, useState, useEffect } from "react";
import { ServerPaths } from "../utils/paths";
import axios from "axios";
import { useHistory } from "react-router-dom"

type DrawerValue = {
    isDrawerOpen: boolean;
    toggleDrawer: () => void;
}
const DrawerContext = createContext<DrawerValue>({} as DrawerValue);

function useDrawerContextProps(): DrawerValue {
    const [isDrawerOpen, setDrawerOpen] = useState<boolean>(true);
    const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);
    return {
        isDrawerOpen,
        toggleDrawer,
    }
}

export const DrawerProvider = ({ children}: {
    children: React.ReactNode;
    value?: DrawerValue;
}) => {
    const values = useDrawerContextProps();
    return (<DrawerContext.Provider value={values}>
        {children}
    </DrawerContext.Provider>)
}

export default DrawerContext;