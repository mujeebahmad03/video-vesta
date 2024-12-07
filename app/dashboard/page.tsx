import { redirect } from "next/navigation";

import { onAuthenticatedUser } from "@/app/actions/user";

const DashboardPage = async () => {
  //Authentication
  const auth = await onAuthenticatedUser();
  if (auth.status === 200 || auth.status === 201) {
    console.log(JSON.stringify(auth, null, 2));
    return redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }

  if (auth.status === 400 || auth.status === 500 || auth.status === 404) {
    return redirect("/sign-in");
  }
};

export default DashboardPage;
