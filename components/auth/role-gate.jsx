"use client";
import { useCurrentRole } from "@/hooks/use-current-role";
import FormError from "@/components/form-error";
const RoleGate = ({ children, allowedRole }) => {
    const role = useCurrentRole();
    if (role !== allowedRole) {
        return (<div className="mx-auto flex justify-center align-middle h-[90vh]">
        <FormError message="Not allowed, you do not have permission to view this content!"/>
      </div>);
    }
    return <>{children}</>;
};
export default RoleGate;
