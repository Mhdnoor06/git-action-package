import React from "react";
interface RouteObject {
    path: string;
    element: JSX.Element;
    protected?: boolean;
}
interface CommonAppProps {
    routes: RouteObject[];
}
declare const Common_App: React.FC<CommonAppProps>;
export default Common_App;
//# sourceMappingURL=Common_App.d.ts.map