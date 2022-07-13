import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { listProjectsService } from '@services/projects/listProjectsService';
import { listProgramManagersService } from '@services/configs/listProgramManagersService';
import { MainLayout } from '@layouts/MainLayout';
import { HeaderPage } from '@components/HeaderPage';
import { CardUser } from '@components/CardUser';
import { Dropdown } from '@components/Dropdown';
import { DropdownItem } from '@components/DropdownItem';
import Modal from '@components/Modal';
import { useAuth } from '@hooks/useAuth';
import { projectStatus } from '@utils/projectStatus';
import { removeProgramManagerService } from '@services/configs/removeProgramManagerService';

export default function ProgramManagers() {
  const router = useRouter();
  const { user } = useAuth();

  const containerRef = useRef(null);
  const modalRef = useRef(null);
  const [programManagers, setProgramManagers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalProgramManagers, setModalProgramManagers] = useState('');
  const [modalProjects, setModalProjects] = useState([]);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const title = 'Telos Build - Program Managers';

  useEffect(() => {
    async function loadProgramManager() {
      if (!user) {
        router.push('/');
        return;
      }

      try {
        const programManager = await listProgramManagersService({
          user,
        });

        setProgramManagers(programManager);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        router.push('/');
      }
    }

    if (typeof user !== 'undefined') {
      loadProgramManager();
    }
  }, [user, router]);

  async function onRemove(item) {
    try {
      const response = await removeProgramManagerService({
        user: item,
      });

      if (Object.keys(response).length > 0) {
        setProgramManagers((value) => {
          const index = programManagers.findIndex(
            (programManager) => programManager === item
          );
          value.splice(index, 1);
          return [...value];
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onProjects(item) {
    try {
      setModalProgramManagers(item);
      setModalProjects([]);
      setIsModalLoading(true);
      modalRef.current.openModal();

      const projects = await listProjectsService();

      const allProjects = projects.filter(
        (project) => project.program_manager === item
      );

      setModalProjects(allProjects);
      setIsModalLoading(false);
    } catch (error) {
      console.log(error);
      modalRef.current.closeModal();
    }
  }

  if (isLoading) {
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <div className="flex justify-center items-center h-[calc(100vh-4.5rem)]">
          <div className="loader"></div>
        </div>
      </>
    );
  }

  if (programManagers.length === 0) {
    return (
      <>
        <Head>
          <title>{title}</title>
        </Head>
        <div className="flex flex-col justify-center items-center h-[calc(100vh-4.5rem)] pb-14">
          <h1 className="heading-2">Invite the first Program Manager</h1>
          <Link href="/program-managers/invite">
            <a className="btn btn--primary mt-6">Invite</a>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <HeaderPage title="Program Managers">
        <Link href="/program-managers/invite">
          <a className="btn btn--primary">Invite</a>
        </Link>
      </HeaderPage>
      <div className="container" ref={containerRef}>
        {programManagers.map((item, index) => (
          <CardUser key={item} account={item}>
            <Dropdown>
              <DropdownItem onClick={() => onProjects(item)}>
                Projects
              </DropdownItem>
              <DropdownItem onClick={() => onRemove(item)}>Remove</DropdownItem>
            </Dropdown>
          </CardUser>
        ))}
      </div>
      <Modal ref={modalRef} title={`${modalProgramManagers}'s projects`}>
        {isModalLoading ? (
          <div className="px-6 py-12">
            <div className="loader mx-auto"></div>
          </div>
        ) : (
          <>
            {modalProjects.length > 0 ? (
              <>
                {modalProjects.map((project) => (
                  <div
                    key={project.project_id}
                    className="p-6 border-b border-blue-dark-2 last-of-type:border-b-0"
                  >
                    <h4 className="heading-3">{project.title}</h4>
                    <p className="body-2">{projectStatus[project.status]}</p>
                  </div>
                ))}
              </>
            ) : (
              <div className="px-6 py-12 text-center">
                <h4 className="heading-3">
                  The Program Manager doesn't have any projects
                </h4>
              </div>
            )}
          </>
        )}
      </Modal>
    </>
  );
}

ProgramManagers.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};
