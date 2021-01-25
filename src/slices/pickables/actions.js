import { createAsyncThunk } from "@reduxjs/toolkit";

export const pickupItem = createAsyncThunk(
  "pickables/pickupHeal",
  (entityId, pickupedEntityId)
) 
