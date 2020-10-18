import React from "react";
import * as db from "../firestore";

function useAuth() {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      return db.checkAuth((user) => {
        setLoading(false);
        setUser(user);
      });
    }, []);
    return {user,loading}
}

export default useAuth;
