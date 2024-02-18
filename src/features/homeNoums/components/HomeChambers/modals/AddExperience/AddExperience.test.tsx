import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { renderHook } from '@testing-library/react-hooks';
import { intersectionObserver } from '@/test-utils/stubs';
import { cleanup, fireEvent, render } from '@/test-utils';
import { useReference } from '@/features/noums/hooks/references';
import { ElementStatusEnum, ElementTypeEnum } from '@/apollo/generated/types';
import AddExperience from './AddExperience';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
    {children}
  </ApolloProvider>
);

describe('<AddExperience />', () => {
  beforeAll(() => intersectionObserver.mock());
  afterAll(() => {
    cleanup();
    intersectionObserver.restore();
  });

  const handleOpenReferenceModal = vi.fn();
  const handleDeleteOption = vi.fn();
  const setShowDiscardExperienceModal = vi.fn();
  test('Should return correct text and tabs should are not exist ', () => {
    const {
      result: {
        current: {
          approveReference,
          fetchMoreReferences,
          infiniteState,
          referenceData,
          capacityOptions,
          rejectReference,
          discardReference,
          updateReference,
          fetching: referenceFetching,
        },
      },
    } = renderHook(() => useReference(), {
      wrapper: Wrapper,
    });
    const handleOnClick = vi.fn();
    const { getByText } = render(
      <MockedProvider>
        <AddExperience
          elementType={ElementTypeEnum.ProjectWorkExperience}
          isEditing={false}
          handleOpenAddReferenceModal={handleOpenReferenceModal}
          title="Test I am here"
          onClose={handleOnClick}
          loading={false}
          handleAddOption={handleOnClick}
          defaultData={{
            body: 'body text',
            title: 'title text',
            position: 0,
            id: '123',
            status: ElementStatusEnum.Unsaved,
          }}
          isOpen
          {...{
            referenceFetching,
            approveReference,
            rejectReference,
            fetchMoreReferences,
            infiniteState,
            referenceData,
            discardReference,
            updateReference,
            capacityOptions,
            handleDeleteOption,
            setShowDiscardExperienceModal,
          }}
        />
      </MockedProvider>,
    );

    expect(getByText('body text')).toBeInTheDocument();
    expect(getByText('title text')).toBeInTheDocument();
  });

  test.skip('tabs should exist ', async () => {
    const {
      result: {
        current: {
          approveReference,
          fetchMoreReferences,
          infiniteState,
          referenceData,
          capacityOptions,
          rejectReference,
          discardReference,
          updateReference,
          fetching: referenceFetching,
        },
      },
    } = renderHook(() => useReference(), {
      wrapper: Wrapper,
    });
    const handleOnClick = vi.fn();
    const { getByText, getByTestId } = render(
      <AddExperience
        elementType={ElementTypeEnum.ProjectWorkExperience}
        isEditing={false}
        handleOpenAddReferenceModal={handleOpenReferenceModal}
        title="Test I am here"
        onClose={handleOnClick}
        handleAddOption={handleOnClick}
        defaultData={{
          body: 'lorem',
          title: 'lorem',
          position: 0,
          id: '123',
          status: ElementStatusEnum.Unsaved,
        }}
        loading={false}
        isOpen
        {...{
          referenceFetching,
          approveReference,
          rejectReference,
          fetchMoreReferences,
          infiniteState,
          referenceData,
          discardReference,
          updateReference,
          capacityOptions,
          handleDeleteOption,
          setShowDiscardExperienceModal,
        }}
      />,
    );

    const AddExperienceBtn = getByTestId('add_reference_btn');
    expect(AddExperienceBtn).toBeTruthy();
    await fireEvent.click(AddExperienceBtn);

    expect(getByText('Project')).toBeInTheDocument();
    expect(getByText('References')).toBeInTheDocument();
  });
});
