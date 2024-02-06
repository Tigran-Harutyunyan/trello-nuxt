import prisma from "../libs/prismadb";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE,
  entityTitle: string;
  action: ACTION;
  orgId: any;
  user: any
};

export const createAuditLog = async (props: Props) => {
  try {

    const { entityId, entityType, entityTitle, action, user, orgId } = props;

    await prisma.auditLog.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: user?.firstName + " " + user?.lastName,
      }
    });
  } catch (error) {
    console.log("[AUDIT_LOG_ERROR]", error);
  }
}