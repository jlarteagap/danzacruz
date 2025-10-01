import {
  User,
  UpdateUserRoleDto,
  UpdateUserRoleResponse,
} from "@/types/user.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class UsersService {
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Error ${response.status}: ${response.statusText}`
      );
    }
    return response.json();
  }

  async fetchUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return this.handleResponse<User[]>(response);
  }

  async updateUserRole(
    data: UpdateUserRoleDto
  ): Promise<UpdateUserRoleResponse> {
    const response = await fetch(`${API_BASE_URL}/users/${data.userId}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: data.newRole }),
    });

    return this.handleResponse<UpdateUserRoleResponse>(response);
  }
}

// Singleton pattern
export const usersService = new UsersService();
