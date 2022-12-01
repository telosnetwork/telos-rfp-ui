import { useRouter } from 'next/router';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { inviteProgramManagerService } from '@services/configs/inviteProgramManagerService';
import { delay } from '@utils/delay';

import { BaseLayout } from '@layouts/BaseLayout';

import { HeaderBack } from '@components/HeaderBack';
import { Input } from '@components/Input';

const schema = yup.object({
  programManager: yup
    .string()
    .required('Telos Account is required')
    .min(12, 'Telos Account must have 12 characters')
    .max(12, 'Telos Account must have 12 characters'),
});

export default function ProgramManagersInvite() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit({ programManager }) {
    try {
      await inviteProgramManagerService({
        user: programManager,
      });

      delay(() => {
        router.push('/program-managers');
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>Telos Build - Invite Program Manager</title>
      </Head>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HeaderBack>
          <button type="submit" className="btn btn--primary">
            Invite
          </button>
        </HeaderBack>
        <div className="w-full max-w-xl mx-auto py-8 px-4">
          <Input
            {...register('programManager')}
            label="Telos Account"
            error={errors.programManager?.message}
          />
        </div>
      </form>
    </>
  );
}

ProgramManagersInvite.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};
