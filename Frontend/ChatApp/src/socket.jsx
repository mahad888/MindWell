import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";

const SocketContext = createContext();
export const useSocket = () => {
    return useContext(SocketContext);
  }



const SocketProvider = ({ children }) => {
    const token = localStorage.getItem("auth");
    const socket = useMemo(() => {
        return io("http://localhost:5000", {
          transports: ["websocket"],
          auth: {
            token: `Bearer ${token}`,
          },
          withCredentials: true,
        });
      }, [token]);
  

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};


export { SocketProvider};