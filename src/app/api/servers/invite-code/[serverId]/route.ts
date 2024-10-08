import { db } from "@/lib/db";
import { getCurrentUserId } from "@/server/actions/getCurrentUserId";
import { getCurrentUserProfile } from "@/server/controllers/user";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: { serverId: string };
  }
) {
  try {
    /**
     * Getting current user if from session
     */
    const currentUserId = await getCurrentUserId();

    /**
     * If there is no session then return Unauthorized
     */
    if (!currentUserId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profile = await getCurrentUserProfile(currentUserId);

    /**
     * If there is no profile then return Unauthorized
     */
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { serverId } = params;

    if (!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    const updatedServer = await db.server.update({
      where: {
        id: serverId,
      },
      data: {
        inviteCode: crypto.randomUUID(),
      },
    });

    return NextResponse.json(updatedServer);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
