import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const IconsFocusedAPI = createContext();
const IconsFocused = ({children}) => {
    let [isGitHubFocused, setisGitHubFocused] = useState(false);
    let [isLinkedInFocused, setisLinkedInFocused] = useState(false);
    let [isInstagramFocused, setisInstagramFocused] = useState(false);
    let [isProjectsFocused, setisProjectsFocused] = useState(false);
    let navigate = useNavigate();
    let GitHub = ()=>{window.open('https://github.com/akash-6-x','_blank')}
    let LinkedIn = ()=>{window.open('https://www.linkedin.com/in/m-akash-662a982a1/','_blank')}
    let Instagram = ()=>{window.open('https://www.instagram.com/akash_6_x/?__pwa=1','_blank')}
    let Projects = ()=>{navigate('/projects')}

  return (
    <IconsFocusedAPI.Provider value={{isGitHubFocused, setisGitHubFocused, isLinkedInFocused, setisLinkedInFocused, isInstagramFocused, setisInstagramFocused, isProjectsFocused, setisProjectsFocused , GitHub, LinkedIn, Instagram, Projects}}>
        {children}
    </IconsFocusedAPI.Provider>
  )
}

export default IconsFocused