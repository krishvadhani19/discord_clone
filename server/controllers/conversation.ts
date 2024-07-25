import { db } from "@/lib/db";

export const findConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  try {
    const conversation = await db.conversation.findFirst({
      where: {
        // to confirm if memberOne is the receiver and memberTwo is the sender
        OR: [
          { AND: [{ memberOneId }, { memberTwoId }] },
          { AND: [{ memberOneId: memberTwoId }, { memberTwoId: memberOneId }] },
        ],
      },

      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },

        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });

    return conversation;
  } catch (error) {
    return null;
  }
};

export const createNewConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  try {
    const newConversation = await db.conversation.create({
      data: {
        memberOneId,
        memberTwoId,
      },

      include: {
        memberOne: {
          include: {
            profile: true,
          },
        },
        memberTwo: {
          include: {
            profile: true,
          },
        },
      },
    });

    return newConversation;
  } catch (error) {
    return null;
  }
};

export const getOrCreateConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  try {
    const existingConversation = await findConversation(
      memberOneId,
      memberTwoId
    );

    if (!existingConversation) {
      return await createNewConversation(memberOneId, memberTwoId);
    }

    return existingConversation;
  } catch (error) {
    return null;
  }
};
