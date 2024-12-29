import { auth, signOut } from "../auth";

export default async function UserAvatar() {
  const session = await auth();
  console.log(session);
  if (!session?.user) {
    return (
        <div className="flex justify-center items-center">
        <h1 className="text-6xl text-orange-800">No Session Found</h1>
      </div>
    )
  }


  if (!session.user.image) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-6xl text-orange-800">User Image Not found</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <h1 className="text-6xl text-orange-800">
        You are on the Authenticated Page
      </h1>
      <div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">Sign out</button>
        </form>
      </div>

      <img src={session.user.image} alt="" />
    </div>
  );
}
