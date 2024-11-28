import { Switch } from '@radix-ui/react-switch';
import { useState, useRef, useEffect } from 'react';
import PbJsonData from '../../public/data/PB.json';
import Section from '../components/Section';
import { useSession } from '../hooks/sessionContext';
import { TPbProps } from '../types/dataTypes';
import getOffice from '../utils/getOffice-util';

export default function PbProfile() {
  const { user } = useSession();
  const allPbData = PbJsonData;

  const [profile, setProfile] = useState<TPbProps | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isWorking, setIsWorking] = useState(false);
  const [image, setImage] = useState(user?.image_url);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const userData = allPbData.find(
      ({ business_id }) => business_id === user?.business_id
    );

    if (userData) {
      setProfile(userData);
      setImage(userData.image_url);
    }
  }, [user, allPbData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleTagChange = (index: number, newTag: string) => {
    setProfile((prev) => {
      if (!prev) return null;
      const updatedTags = [...(prev?.tags || [])];
      updatedTags[index] = newTag;
      return { ...prev, tags: updatedTags };
    });
  };

  function isNullTag(tag: string) {
    return tag.trim() === '';
  }

  const handleAddTag = () => {
    if (profile?.tags.some(isNullTag)) {
      alert('새로운 태그를 추가하기 전에 이미 존재하는 태그를 채워주세요');
      return;
    }
    setProfile((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        tags: [...prev.tags, ''],
      };
    });
  };

  const handleRemoveTag = (index: number) => {
    setProfile((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        tags: prev.tags.filter((_, i) => i !== index),
      };
    });
  };

  const handleSubmit = () => {
    if (profile?.tags.some(isNullTag)) {
      alert('tag가 비어있습니다!');
      return;
    }

    setIsEditing(false);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setProfile((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          image_url: reader.result as string,
        };
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    profile && (
      <Section
        title='내 프로필'
        pbProfile={true}
        contentClassName='w-full h-full flex items-center justify-center px-3'
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleSubmit={handleSubmit}
      >
        <div className='w-full flex justify-between items-center'>
          <input
            type='file'
            style={{ display: 'none' }}
            accept='image/jpg,image/png,image/jpeg'
            name='profile_img'
            onChange={handleImage}
            ref={fileInput}
          />
          <img
            className={`w-28 h-28 rounded-full ${isEditing && 'cursor-pointer'}`}
            src={image}
            alt='프로필 이미지'
            onClick={() => {
              isEditing && fileInput.current?.click();
            }}
          />

          <div className='flex flex-col ml-3 mt-3 w-full justify-between'>
            <div className='flex items-center'>
              <div className='flex items-center w-16 text-xl font-bold'>
                {user?.name}
              </div>
              <p className='mr-4'>PB</p>

              {/* 빠른 상담 가능 여부 토글 */}
              <Switch
                checked={isWorking}
                onCheckedChange={setIsWorking}
                className={`${
                  isWorking ? 'bg-green-500' : 'bg-red-500'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
              >
                <span
                  className={`${
                    isWorking ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>

            <small className='text-hanagold my-1'>
              {getOffice(profile?.office_id)}
            </small>

            {/* PB 태그 */}
            <div className='flex flex-wrap gap-1'>
              {profile?.tags?.map((tag, index) => (
                <div
                  key={index}
                  className='flex items-center bg-hanaindigo rounded-lg w-[30%] h-8 p-1'
                >
                  <p className='text-white text-xs mx-1'>#</p>
                  <input
                    className='bg-transparent text-white text-xs w-full'
                    type='text'
                    value={tag}
                    id='tag'
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    disabled={!isEditing}
                    placeholder='입력'
                    maxLength={5}
                  />
                  {isEditing && (
                    <button
                      className='flex items-center text-red-600 ml-1 mr-1'
                      type='button'
                      onClick={() => handleRemoveTag(index)}
                    >
                      x
                    </button>
                  )}
                </div>
              ))}
              {isEditing && profile.tags?.length < 3 && (
                <button
                  className='text-hanaindigo border border-hanaindigo px-2 py-1 rounded-full text-sm'
                  type='button'
                  onClick={handleAddTag}
                >
                  + 태그 추가
                </button>
              )}
            </div>

            {/* 한 줄 자기소개 */}
            {isEditing ? (
              <textarea
                className='p-1 w-auto mt-2 text-xs text-hanaindigo resize-none outline-none border-2 focus:border-hanaindigo'
                name='introduce'
                value={profile?.introduce}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder={profile?.introduce}
                maxLength={50}
              />
            ) : (
              <div className='text-xs text-black my-2'>
                {profile?.introduce}
              </div>
            )}
          </div>
        </div>
      </Section>
    )
  );
}
