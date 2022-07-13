import { useAuth } from '@hooks/useAuth';
import Link from 'next/link';

export function ProjectEmpty() {
  const { isProgramManager } = useAuth();

  return (
    <div className="flex flex-col justify-center items-center text-center h-[calc(100vh-4.5rem)] pb-14 px-4">
      {isProgramManager ? (
        <>
          <h1 className="heading-2">Submit the first project</h1>
          <Link href="/projects/form/new">
            <a className="btn btn--primary mt-6">Create Project</a>
          </Link>
        </>
      ) : (
        <h1 className="heading-2">We don't have any published projects yet.</h1>
      )}
    </div>
  );
}
