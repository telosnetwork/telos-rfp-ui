import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { FormStepOne } from '@components/projects/FormStepOne';
import { FormStepTwo } from '@components/projects/FormStepTwo';
import { BaseLayout } from '@layouts/BaseLayout';
import { showProjectService } from '@services/projects/showProjectService';
import { removeProjectService } from '@services/projects/removeProjectService';
import { isDraft } from '@utils/projectStatus';
import { delay } from '@utils/delay';
import { deleteFileService } from '@services/files/deleteFileService';

export default function ProjectForm({ initialData }) {
  const isNew = Object.keys(initialData).length === 0;
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState(initialData);

  async function onDelete() {
    try {
      await removeProjectService({
        projectId: initialData.project_id,
      });

      await deleteFileService(initialData.pdf);

      delay(() => {
        router.push('/');
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (step === 1) {
    return (
      <>
        <Head>
          <title>Telos Build - Project first step</title>
        </Head>
        <FormStepOne
          setStep={setStep}
          data={data}
          setData={setData}
          onDelete={onDelete}
          isNew={isNew}
        />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Telos Build - Project second step</title>
      </Head>
      <FormStepTwo
        setStep={setStep}
        data={data}
        setData={setData}
        onDelete={onDelete}
        isNew={isNew}
      />
    </>
  );
}

ProjectForm.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};

export async function getServerSideProps(context) {
  if (context.params.id === 'new') {
    return {
      props: {
        initialData: {},
      },
    };
  }

  try {
    const project = await showProjectService({
      projectId: context.params.id,
    });

    const { ['telosworks.user']: actor } = parseCookies(context);
    if (
      !project ||
      project.program_manager !== actor ||
      !isDraft(project.status)
    ) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return {
      props: {
        initialData: project,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}
