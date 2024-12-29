'use client';

import { signOut, useSession } from 'next-auth/react';

export default function UserAvatar() {
  const { data: session, status } = useSession(); // Use useSession for client-side

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-6xl text-orange-800">Loading...</h1>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-6xl text-orange-800">No Session Found</h1>
      </div>
    );
  }

  if (!session.user.image) {
    return (
      <div className="flex justify-center items-center">
        <h1 className="text-6xl text-orange-800">User Image Not Found</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <h1 className="text-6xl text-orange-800">You are on the Authenticated Page</h1>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault(); // Prevent default form submission
            await signOut(); // Sign out the user
          }}
        >
          <button type="submit">Sign out</button>
        </form>
      </div>

      <img src={session.user.image} alt="User Avatar" />
    </div>
  );
}
