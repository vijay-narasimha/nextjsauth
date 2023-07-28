export default function UserProfile({params}:any) {
    return (
      <>
        <div className='flex flex-col items-center justify-center py-2 min-h-screen'>
          <h1>Profile</h1>
          <p className="text-4xl"> Profile Page {params.id}</p>
        </div>
      </>
    );
  }
  