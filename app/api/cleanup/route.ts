import { NextRequest } from "next/server";
import { supabaseAdmin } from "../users/route";

async function cleanupUsers() {
  const authorizedEmail = process.env.AUTHORIZED_EMAIL;

  const { data: authorizedUser } = await supabaseAdmin
    .from("users")
    .select("id")
    .eq("email", authorizedEmail)
    .single();

  if (!authorizedUser) {
    throw new Error("Authorized user not found");
  }

  const { data: usersToDelete, error: usersError } = await supabaseAdmin
    .from("users")
    .select("id, email")
    .neq("email", authorizedEmail);

  if (usersError) {
    console.error("Error fetching users:", usersError);
    return {
      error: "Database error",
      details: usersError,
      status: 500,
    };
  }

  if (!usersToDelete || usersToDelete.length === 0) {
    return {
      message: "No users to delete",
      status: 200,
    };
  }

  const userIds = usersToDelete.map((user) => user.id);

  const { error: expensesError } = await supabaseAdmin
    .from("expenses")
    .delete()
    .in("userId", userIds);

  if (expensesError) {
    console.error("Error deleting expenses:", expensesError);
    return {
      error: "Failed to delete expenses",
      details: expensesError,
      status: 500,
    };
  }

  const { error: incomesError } = await supabaseAdmin
    .from("incomes")
    .delete()
    .in("userId", userIds);

  if (incomesError) {
    console.error("Error deleting incomes:", incomesError);
    return {
      error: "Failed to delete incomes",
      details: incomesError,
      status: 500,
    };
  }

  const { error: deleteUsersError } = await supabaseAdmin
    .from("users")
    .delete()
    .in("id", userIds);

  if (deleteUsersError) {
    console.error("Error deleting users:", deleteUsersError);
    return {
      error: "Failed to delete users",
      details: deleteUsersError,
      status: 500,
    };
  }

  return {
    message: "Cleanup completed successfully",
    deletedUsers: usersToDelete.length,
    status: 200,
  };
}

export async function GET(req: NextRequest) {
  try {
    const result = await cleanupUsers();
    const { status, ...data } = result;
    return new Response(JSON.stringify(data), { status });
  } catch (error) {
    console.error("API Error:", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const result = await cleanupUsers();
    const { status, ...data } = result;
    return new Response(JSON.stringify(data), { status });
  } catch (error) {
    console.error("API Error:", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
}
